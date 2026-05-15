<?php

namespace App\Services;

use App\DTOs\AnimeData;
use App\DTOs\PaginatedAnimeData;
use App\DTOs\TriggerData;
use App\Models\Anime;
use App\Models\AnimeDemographic;
use App\Models\AnimeGenre;
use App\Models\AnimeProducer;
use App\Models\AnimeStudio;
use App\Models\AnimeTheme;
use App\Models\Demographic;
use App\Models\Genre;
use App\Models\MasterTrigger;
use App\Models\Producer;
use App\Models\Studio;
use App\Models\Theme;
use App\Utils\GenerateSlug;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AnimeService
{
    public function fetchAnimes(array $filter, array $sort, int $paginateLimit = 15): PaginatedAnimeData
    {
        $query = Anime::with(['genres', 'animeTriggers'])
            ->where('animes.rating', '!=', 'Rx - Hentai');

        $query->when(filled($filter['query'] ?? null), function ($q) use ($filter) {
            $rawTerm = trim($filter['query']);
            $booleanTerm = $this->buildBooleanSearch($rawTerm);

            $q->where(function ($subQuery) use ($rawTerm, $booleanTerm) {
                if ($booleanTerm !== null) {
                    $subQuery->whereRaw(
                        "MATCH(title, title_english, title_japanese) AGAINST (? IN BOOLEAN MODE)",
                        [$booleanTerm]
                    );
                } else {
                    $subQuery->where('title', 'like', '%' . $rawTerm . '%')
                        ->orWhere('title_english', 'like', '%' . $rawTerm . '%')
                        ->orWhere('title_japanese', 'like', '%' . $rawTerm . '%');
                }

                $subQuery->orWhereJsonContains('title_synonyms', $rawTerm)
                    ->orWhere('title_synonyms', 'like', '%' . $rawTerm . '%');
            });

            if ($booleanTerm !== null) {
                $q->select('*')
                    ->selectRaw(
                        "MATCH(title, title_english, title_japanese) AGAINST (? IN BOOLEAN MODE) AS relevance",
                        [$booleanTerm]
                    )
                    ->orderByDesc('relevance');
            }
        });

        $query->when(array_key_exists('airing', $filter) && !is_null($filter['airing']), function ($q) use ($filter) {
            $q->where('animes.airing', (bool) $filter['airing']);
        });

        $query->when(!empty($filter['genres']), function ($q) use ($filter) {
            $q->whereHas('genres', function ($q) use ($filter) {
                $q->whereIn('genres.id', (array) $filter['genres']);
            });
        });

        $query->when(!empty($filter['themes']), function ($q) use ($filter) {
            $q->whereHas('themes', function ($q) use ($filter) {
                $q->whereIn('themes.id', (array) $filter['themes']);
            });
        });

        $query->when(!empty($filter['years']), function ($q) use ($filter) {
            $q->whereIn('animes.year', (array) $filter['years']);
        });

        $query->when(!empty($filter['seasons']), function ($q) use ($filter) {
            $q->whereIn('animes.season', (array) $filter['seasons']);
        });

        $query->when(!empty($filter['types']), function ($q) use ($filter) {
            $q->whereIn('animes.type', (array) $filter['types']);
        });

        $query->when(!empty($sort['sort']), function ($q) use ($sort) {
            $direction = strtolower($sort['order'] ?? 'asc') === 'desc' ? 'desc' : 'asc';
            $q->orderBy('animes.' . $sort['sort'], $direction);
        }, function ($q) {
            $q->orderByRaw("animes.type = 'TV' DESC")
                ->orderBy('animes.year', 'desc')
                ->orderBy('animes.airing', 'desc')
                ->orderBy('animes.score', 'desc');
        });

        $paginator = $query
            ->paginate($paginateLimit)
            ->onEachSide(1)
            ->withQueryString();

        $transformed = $paginator->through(fn(Anime $item): AnimeData => AnimeData::fromModel($item));

        return PaginatedAnimeData::fromPaginator($transformed);
    }

    /**
     * @return array<int, AnimeData>
     */
    public function fetchTopAnime(int $limit = 8): array
    {
        $animeFromDb = Anime::with(['genres', 'animeTriggers'])
            ->orderBy('score', 'desc')
            ->where('rating', '!=', 'Rx - Hentai')
            ->limit($limit)
            ->get();

        return $animeFromDb->map(fn($item) => AnimeData::fromModel($item))->values()->all();
    }

    /**
     * Fetches a specific page of airing anime and syncs it to the database.
     *
     * @return array{has_next_page: bool, synced_mal_ids: array<int, int>}
     */
    public function syncAiringAnimePage(int $page = 1): array
    {
        $response = Http::withQueryParameters([
            'page' => $page,
        ])->get(config('app.jikan_url') . '/seasons/now');

        if ($response->failed()) {
            Log::warning("Jikan API failed for syncing airing anime page {$page}. Status: {$response->status()}");
            $response->throw();
        }

        $apiPayload = $response->json();
        $animeDataDtos = $this->mapApiPayloadToAnimeData($apiPayload);
        $syncedMalIds = [];

        if (! empty($animeDataDtos)) {
            $syncedMalIds = collect($animeDataDtos)->pluck('mal_id')->all();

            // Pass false to prevent overwriting 'airing' status during the pagination loop
            $this->bulkInsertAnimeWithMetaData($animeDataDtos, false);
        }

        return [
            'has_next_page' => $apiPayload['pagination']['has_next_page'] ?? false,
            'synced_mal_ids' => $syncedMalIds,
        ];
    }

    /**
     * Cleans up anime that are no longer airing.
     *
     * @param  array<int, int>  $activeMalIds
     */
    public function cleanupStaleAiringAnime(array $activeMalIds): void
    {
        if (empty($activeMalIds)) {
            return;
        }

        Anime::where('airing', true)
            ->whereNotIn('mal_id', $activeMalIds)
            ->update(['airing' => false]);
    }

    /**
     * Fetches a specific page of the overall anime catalog and syncs it.
     *
     * @return bool Returns true if there is a next page.
     */
    public function syncCatalogPage(int $page = 1): bool
    {
        \Log::info('sync anime');
        $response = Http::timeout(15)->withQueryParameters([
            'page' => $page,
        ])->get(config('app.jikan_url') . '/top/anime');

        if ($response->failed()) {
            Log::warning("Jikan API failed for syncing catalog page {$page}. Status: {$response->status()}");
            $response->throw();
        }

        $apiPayload = $response->json();
        $animeDataDtos = $this->mapApiPayloadToAnimeData($apiPayload);

        if (! empty($animeDataDtos)) {
            // Pass false because we are not syncing current airing status
            $this->bulkInsertAnimeWithMetaData($animeDataDtos, false);
        }

        return $apiPayload['pagination']['has_next_page'] ?? false;
    }

    /**
     * Fetch airing anime directly from the local database.
     *
     * @return array<int, AnimeData>
     */
    public function getNowAiringFromDatabase(int $limit = 12): array
    {
        $animeFromDb = Anime::with(['genres', 'animeTriggers'])
            ->where('airing', true)
            ->where('rating', '!=', 'Rx - Hentai')
            ->orderBy('score', 'desc')
            ->limit($limit)
            ->get();

        return $animeFromDb->map(fn($item) => AnimeData::fromModel($item))->values()->all();
    }

    public function getAnimeInfo(string $slug): Anime
    {
        return Anime::with(['demographics', 'genres', 'producers', 'studios', 'themes'])
            ->where('slug', $slug)->firstOrFail();
    }

    /**
     * @return Collection<int, TriggerData>
     */
    public function getAnimeTriggers(int $animeId): Collection
    {
        $triggersFromDb = MasterTrigger::with([
            'triggerContents' => function ($query) {
                $query->orderBy('importance', 'desc');
            },
            'triggerContents.animeTriggers' => function ($query) use ($animeId) {
                $query->where('anime_id', $animeId);
            },
        ])
            ->orderBy('importance', 'desc')->get();
        $triggers = $triggersFromDb->map(fn(MasterTrigger $trigger) => TriggerData::fromModel($trigger));

        return $triggers;
    }

    public function getAnimeYear()
    {
        return Anime::where('year', '!=', null)
            ->orderBy('year', 'desc')
            ->distinct()->pluck('year');
    }

    /**
     * @param  array<int, AnimeData>  $animeApiData
     */
    private function bulkInsertAnimeWithMetaData(array $animeApiData, bool $isNowAiringSync = false): void
    {
        if (empty($animeApiData)) {
            return;
        }

        $built = $this->buildAnimeRecords($animeApiData);

        DB::transaction(function () use ($animeApiData, $built, $isNowAiringSync): void {
            Anime::upsert(
                $built['animeRecords'],
                ['mal_id'],
                ['episodes', 'status', 'airing', 'score', 'rank', 'rating', 'images']
            );

            if ($isNowAiringSync) {
                Anime::where('airing', true)
                    ->whereNotIn('mal_id', $built['animeMalIds'])
                    ->update(['airing' => false]);
            }

            $insertedAnimeRecords = Anime::whereIn('mal_id', $built['animeMalIds'])->get();

            $this->processAndInsertAnimeMetadata(
                animeApiData: $animeApiData,
                insertedAnimeRecords: $insertedAnimeRecords,
                apiProperty: 'demographics',
                relatedModel: Demographic::class,
                pivotModel: AnimeDemographic::class,
                pivotForeignKey: 'demographic_id'
            );

            $this->processAndInsertAnimeMetadata(
                animeApiData: $animeApiData,
                insertedAnimeRecords: $insertedAnimeRecords,
                apiProperty: 'genres',
                relatedModel: Genre::class,
                pivotModel: AnimeGenre::class,
                pivotForeignKey: 'genre_id'
            );

            $this->processAndInsertAnimeMetadata(
                animeApiData: $animeApiData,
                insertedAnimeRecords: $insertedAnimeRecords,
                apiProperty: 'producers',
                relatedModel: Producer::class,
                pivotModel: AnimeProducer::class,
                pivotForeignKey: 'producer_id'
            );

            $this->processAndInsertAnimeMetadata(
                animeApiData: $animeApiData,
                insertedAnimeRecords: $insertedAnimeRecords,
                apiProperty: 'studios',
                relatedModel: Studio::class,
                pivotModel: AnimeStudio::class,
                pivotForeignKey: 'studio_id'
            );

            $this->processAndInsertAnimeMetadata(
                animeApiData: $animeApiData,
                insertedAnimeRecords: $insertedAnimeRecords,
                apiProperty: 'themes',
                relatedModel: Theme::class,
                pivotModel: AnimeTheme::class,
                pivotForeignKey: 'theme_id'
            );
        });
    }

    /**
     * @param  array<int, AnimeData>  $animeApiData
     * @return array{
     *     animeRecords: array<int, array<string, mixed>>,
     *     animeMalIds: array<int, int>
     * }
     */
    private function buildAnimeRecords(array $animeApiData): array
    {
        $animeRecordsToInsert = [];
        $animeMalIds = [];

        foreach ($animeApiData as $apiAnime) {
            $slug = GenerateSlug::generate($apiAnime->title, $apiAnime->mal_id);

            $animeRecordsToInsert[] = [
                'mal_id' => $apiAnime->mal_id,
                'url' => $apiAnime->url,
                'season' => $apiAnime->season,
                'year' => $apiAnime->year,
                'images' => json_encode($apiAnime->images),
                'trailer' => json_encode($apiAnime->trailer),
                'approved' => $apiAnime->approved,
                'titles' => json_encode($apiAnime->titles),
                'title' => $apiAnime->title,
                'title_english' => $apiAnime->title_english,
                'title_japanese' => $apiAnime->title_japanese,
                'title_synonyms' => json_encode($apiAnime->title_synonyms),
                'type' => $apiAnime->type,
                'source' => $apiAnime->source,
                'episodes' => $apiAnime->episodes,
                'status' => $apiAnime->status,
                'airing' => $apiAnime->airing,
                'aired' => json_encode($apiAnime->aired),
                'duration' => $apiAnime->duration,
                'rating' => $apiAnime->rating,
                'score' => $apiAnime->score,
                'synopsis' => $apiAnime->synopsis,
                'background' => $apiAnime->background,
                'rank' => $apiAnime->rank,
                'slug' => $slug,
                'created_at' => now(),
                'updated_at' => now(),
            ];

            $animeMalIds[] = $apiAnime->mal_id;
        }

        return [
            'animeRecords' => $animeRecordsToInsert,
            'animeMalIds' => $animeMalIds,
        ];
    }

    /**
     * @param  array<string, mixed>  $apiPayload
     * @return array<int, AnimeData>
     */
    private function mapApiPayloadToAnimeData(array $apiPayload): array
    {
        if (! isset($apiPayload['data']) || ! is_array($apiPayload['data'])) {
            return [];
        }

        return collect($apiPayload['data'])
            ->unique('mal_id')
            ->map(fn(array $item) => AnimeData::fromArray($item))
            ->values()
            ->all();
    }

    /**
     * @return array<int, AnimeData>
     */
    private function getAnimeFromCache(string $cacheKey): array
    {
        if (! Cache::has($cacheKey)) {
            return [];
        }

        $cachedMalIds = Cache::get($cacheKey, []);

        if (empty($cachedMalIds)) {
            return [];
        }

        $dataFromDb = Anime::with(['genres', 'demographics', 'producers', 'studios', 'themes'])
            ->whereIn('mal_id', $cachedMalIds)
            ->get();

        if ($dataFromDb->isEmpty()) {
            return [];
        }

        $sorted = $dataFromDb->sortBy(fn($anime) => array_search($anime->mal_id, $cachedMalIds));

        return $sorted->map(fn($item) => AnimeData::fromModel($item))->values()->all();
    }

    /**
     * Extracts, inserts, and maps related metadata for the anime payload.
     *
     * @param  array<int, AnimeData>  $animeApiData
     * @param  Collection<int, Anime>  $insertedAnimeRecords
     * @param  class-string<Model>  $relatedModel
     * @param  class-string<Model>  $pivotModel
     */
    private function processAndInsertAnimeMetadata(
        array $animeApiData,
        Collection $insertedAnimeRecords,
        string $apiProperty,
        string $relatedModel,
        string $pivotModel,
        string $pivotForeignKey
    ): void {
        $relatedModelDatas = [];
        $malAnimeIdWithPivotData = [];

        foreach ($animeApiData as $apiData) {
            if (empty($apiData->{$apiProperty})) {
                continue;
            }

            foreach ($apiData->{$apiProperty} as $property) {
                $malAnimeIdWithPivotData[$apiData->mal_id][] = $property->mal_id;

                $relatedModelDatas[$property->mal_id] = [
                    'mal_id' => $property->mal_id,
                    'type' => $property->type,
                    'name' => $property->name,
                    'url' => $property->url,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        if (empty($relatedModelDatas)) {
            return;
        }

        $relatedModel::insertOrIgnore($relatedModelDatas);

        $insertedRelatedDatas = $relatedModel::whereIn('mal_id', array_keys($relatedModelDatas))->get();
        $relatedIdsLookup = $insertedRelatedDatas->pluck('id', 'mal_id')->toArray();

        $pivotTableDatas = [];

        foreach ($insertedAnimeRecords as $dbAnimeRecord) {
            if (! isset($malAnimeIdWithPivotData[$dbAnimeRecord->mal_id])) {
                continue;
            }

            foreach ($malAnimeIdWithPivotData[$dbAnimeRecord->mal_id] as $malId) {
                if (! isset($relatedIdsLookup[$malId])) {
                    continue;
                }

                $pivotTableDatas[] = [
                    'anime_id' => $dbAnimeRecord->id,
                    $pivotForeignKey => $relatedIdsLookup[$malId],
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        if (! empty($pivotTableDatas)) {
            $pivotModel::insertOrIgnore($pivotTableDatas);
        }
    }

    private function buildBooleanSearch(string $input): ?string
    {
        $input = trim(mb_strtolower($input));

        if ($input === '') {
            return null;
        }

        $tokens = preg_split('/[^\p{L}\p{N}]+/u', $input, -1, PREG_SPLIT_NO_EMPTY) ?: [];

        $stopwords = ['a', 'an', 'and', 'as', 'at', 'for', 'in', 'is', 'it', 'of', 'on', 'or', 'the', 'to', 'with'];

        $tokens = array_values(array_filter($tokens, static function ($token) use ($stopwords) {
            return $token !== '' && !in_array($token, $stopwords, true);
        }));

        if ($tokens === []) {
            return null;
        }

        return implode(' ', array_map(static fn($token) => '+' . $token . '*', $tokens));
    }
}
