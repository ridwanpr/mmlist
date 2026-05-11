<?php

namespace App\Services;

use App\DTOs\AnimeData;
use App\DTOs\TriggerContentData;
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
use App\Models\TriggerContent;
use Exception;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AnimeService
{
    /**
     * @return array<int, AnimeData>
     */
    public function fetchNowAiring(int $limit = 12, string $forPage = 'home'): array
    {
        try {
            $cacheKey = "anime_now_airing_ids_{$limit}";

            $cachedAnime = $this->getAnimeFromCache($cacheKey);

            if (! empty($cachedAnime)) {
                return $cachedAnime;
            }

            $response = Http::withQueryParameters([
                'limit' => $limit,
            ])->get(config('app.jikan_url') . '/seasons/now');

            if ($response->failed()) {
                Log::warning("Fetching Jikan API failed for now airing. Status: {$response->status()}", [
                    'body' => $response->body(),
                ]);
                $response->throw();
            }

            $apiPayload = $response->json();
            $animeDataDtos = $this->mapApiPayloadToAnimeData($apiPayload);

            if (! empty($animeDataDtos)) {
                $malIdsToCache = collect($animeDataDtos)->pluck('mal_id')->all();
                Cache::put($cacheKey, $malIdsToCache, now()->addHours(12));

                $this->bulkInsertAnimeWithMetaData($animeDataDtos, true);
            }

            return $animeDataDtos;
        } catch (Exception $e) {
            Log::error('Failed to fetch Now Airing anime: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * @return array<int, AnimeData>
     */
    public function fetchTopAnime(int $limit = 8): array
    {
        try {
            $cacheKey = "anime_top_ids_{$limit}";

            $cachedAnime = $this->getAnimeFromCache($cacheKey);

            if (! empty($cachedAnime)) {
                return $cachedAnime;
            }

            $response = Http::timeout(10)
                ->withQueryParameters([
                    'limit' => $limit,
                ])
                ->get(config('app.jikan_url') . '/top/anime');

            if ($response->failed()) {
                Log::warning("Jikan API failed for Top Anime. Status: {$response->status()}");
                $response->throw();
            }

            $apiPayload = $response->json();
            $animeDataDtos = $this->mapApiPayloadToAnimeData($apiPayload);

            if (! empty($animeDataDtos)) {
                $malIdsToCache = collect($animeDataDtos)->pluck('mal_id')->all();
                Cache::put($cacheKey, $malIdsToCache, now()->addHours(24));

                $this->bulkInsertAnimeWithMetaData($animeDataDtos, false);
            }

            return $animeDataDtos;
        } catch (Exception $e) {
            Log::error('Failed to fetch Top Anime: ' . $e->getMessage());

            return [];
        }
    }

    /**
     * @param  array<int, AnimeData>  $animeApiData
     */
    public function bulkInsertAnimeWithMetaData(array $animeApiData, bool $isNowAiringSync = false): void
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

    public function getAnimeInfo(string $slug): Anime
    {
        return Anime::with(['demographics', 'genres', 'producers', 'studios', 'themes'])
            ->where('slug', $slug)->firstOrFail();
    }

    /**
     * @return Collection<TriggerData>
     */
    public function getAnimeTriggers(int $animeId): Collection
    {
        $triggersFromDb = MasterTrigger::with('triggerContents')->orderBy('importance', 'desc')->get();
        $triggers = $triggersFromDb->map(fn(MasterTrigger $trigger) => TriggerData::fromModel($trigger));

        return $triggers;
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
            // Convert the numeric ID to short alphanumeric string
            $shortId = base_convert((string) $apiAnime->mal_id, 10, 36);
            // Generate the full slug from the title
            $baseSlug = Str::slug($apiAnime->title);
            // Limit the slug to 60 characters and remove any dangling hyphens
            $truncatedSlug = rtrim(substr($baseSlug, 0, 60), '-');
            // Append the unique short ID
            $finalSlug = $truncatedSlug . '-' . $shortId;

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
                'slug' => $finalSlug,
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
}
