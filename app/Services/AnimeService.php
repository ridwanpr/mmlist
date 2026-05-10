<?php

namespace App\Services;

use Exception;
use App\DTOs\AnimeData;
use App\Models\AnimeDemographic;
use App\Models\AnimeGenre;
use App\Models\Demographic;
use App\Models\Genre;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Anime;
use App\Models\AnimeProducer;
use App\Models\AnimeStudio;
use App\Models\AnimeTheme;
use App\Models\Producer;
use App\Models\Studio;
use App\Models\Theme;
use Illuminate\Database\Eloquent\Model;

class AnimeService
{
    // /**
    //  * @return array<int, AnimeData>
    //  */
    public function fetchNowAiring(int $limit = 12, string $forPage = 'home')
    {
        try {
            $dataFromDb = Anime::with(['genres', 'demographics', 'producers', 'studios', 'themes'])
                ->where('airing', true)
                ->limit($limit)
                ->get();

            if ($dataFromDb->count() > 0) {
                $mappedDbData = $dataFromDb->map(fn($item) => AnimeData::fromModel($item))->all();
                return $mappedDbData;
            }
            
            // Fallback to API
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
            $animeDataDtos = [];

            if (isset($apiPayload['data']) && is_array($apiPayload['data'])) {

                $animeDataDtos = collect($apiPayload['data'])
                    ->unique('mal_id')
                    ->map(fn(array $item) => AnimeData::fromArray($item))
                    ->values()
                    ->all();

                defer(fn() => $this->bulkInsertAnimeWithMetaData($animeDataDtos));
            }

            return $animeDataDtos;
        } catch (Exception $e) {
            Log::error('Failed to fetch Now Airing anime: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Fetch top anime.
     *
     * @return array{data: array<int, AnimeData>}
     */
    public function fetchTopAnime(int $limit = 8): array
    {
        try {
            $topAnimeFromDb = Anime::with(['genres', 'demographics', 'producers', 'studios', 'themes'])
                ->whereNotNull('rank')
                ->orderBy('rank')
                ->take($limit)
                ->get();

            if ($topAnimeFromDb->count() > 0) {
                $mappedDbData = $topAnimeFromDb->map(fn($item) => AnimeData::fromModel($item))->all();
                return $mappedDbData;
            }


            $response = Http::timeout(10)->withQueryParameters([
                'limit' => $limit,
            ])->get(config('app.jikan_url') . '/top/anime');

            if ($response->failed()) {
                Log::warning("Jikan API failed for Top Anime. Status: {$response->status()}");
                $response->throw();
            }

            $animeData = $response->json();
            $animeDataDtos = [];
            if (isset($apiPayload['data']) && is_array($apiPayload['data'])) {

                $animeDataDtos = collect($apiPayload['data'])
                    ->unique('mal_id')
                    ->map(fn(array $item) => AnimeData::fromArray($item))
                    ->values()
                    ->all();

                defer(fn() => $this->bulkInsertAnimeWithMetaData($animeDataDtos));
            }

            return $animeDataDtos;
        } catch (Exception $e) {
            Log::error('Failed to fetch Top Anime: ' . $e->getMessage());

            return ['data' => []];
        }
    }

    /**
     * @param  array<AnimeData>  $animeApiData
     */
    public function bulkInsertAnimeWithMetaData(array $animeApiData): void
    {
        $buildedAnimeRecords = $this->buildAnimeRecords($animeApiData);

        Anime::insertOrIgnore($buildedAnimeRecords['animeRecords']);

        $insertedAnimeRecords = Anime::whereIn('mal_id', $buildedAnimeRecords['animeMalIds'])->get();

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
    }

    /**
     * @param  array<AnimeData>  $animeApiData
     */
    private function buildAnimeRecords(array $animeApiData)
    {
        $animeRecordsToInsert = [];
        $animeMalIds = [];
        foreach ($animeApiData as $apiAnime) {
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
                'created_at' => now(),
            ];

            $animeMalIds[] = $apiAnime->mal_id;
        }

        return [
            'animeRecords' => $animeRecordsToInsert,
            'animeMalIds' => $animeMalIds
        ];
    }

    /**
     * Extracts, inserts, and maps related metadata (genres, demographics, etc.) for the anime payload.
     *
     * @param array<int, AnimeData> $animeApiData
     * @param Collection<int, \stdClass> $insertedAnimeRecords
     * @param string $apiProperty The key from the Jikan API (e.g., 'genres', 'demographics')
     * @param class-string<Model> $relatedModel The Eloquent model class for the entity (e.g., Genre::class)
     * @param class-string<Model> $pivotModel The Eloquent model class for the pivot table (e.g., AnimeGenre::class)
     * @param string $pivotForeignKey The column name in the pivot table (e.g., 'genre_id')
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
            if (empty($apiData->$apiProperty)) {
                continue;
            }

            foreach ($apiData->$apiProperty as $property) {
                $malAnimeIdWithPivotData[$apiData->mal_id][] = $property->mal_id;
                $relatedModelDatas[$property->mal_id] = [
                    'mal_id' => $property->mal_id,
                    'type' => $property->type,
                    'name' => $property->name,
                    'url' => $property->url,
                    'created_at' => now()
                ];
            }
        }

        $relatedModel::insertOrIgnore($relatedModelDatas);

        $insertedRelatedDatas = $relatedModel::whereIn('mal_id', array_keys($relatedModelDatas))->get();
        $relatedIdsLookup = $insertedRelatedDatas->pluck('id', 'mal_id')->toArray();

        $pivotTableDatas = [];
        foreach ($insertedAnimeRecords as $dbAnimeRecord) {
            if (!isset($malAnimeIdWithPivotData[$dbAnimeRecord->mal_id])) {
                continue;
            }
            foreach ($malAnimeIdWithPivotData[$dbAnimeRecord->mal_id] as $malId) {
                $pivotTableDatas[] = [
                    'anime_id' => $dbAnimeRecord->id,
                    $pivotForeignKey => $relatedIdsLookup[$malId]
                ];
            }
        }

        $pivotModel::insertOrIgnore($pivotTableDatas);
    }
}
