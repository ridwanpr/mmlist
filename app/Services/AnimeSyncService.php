<?php

namespace App\Services;

use App\DTOs\AnimeData;
use App\Models\Anime;
use App\Models\AnimeDemographic;
use App\Models\AnimeGenre;
use App\Models\AnimeProducer;
use App\Models\AnimeStudio;
use App\Models\AnimeTheme;
use App\Models\Demographic;
use App\Models\Genre;
use App\Models\Producer;
use App\Models\Studio;
use App\Models\Theme;
use App\Utils\GenerateSlug;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AnimeSyncService
{
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

        if (!empty($animeDataDtos)) {
            $syncedMalIds = collect($animeDataDtos)->pluck('mal_id')->all();
            $this->bulkInsertAnimeWithMetaData($animeDataDtos, false);
            $masterService = new MasterService();
            $masterService->clearCache();
        }

        return [
            'has_next_page' => $apiPayload['pagination']['has_next_page'] ?? false,
            'synced_mal_ids' => $syncedMalIds,
        ];
    }

    public function syncCatalogPage(int $page = 1): bool
    {
        Log::info('sync anime');
        $response = Http::timeout(15)->withQueryParameters([
            'page' => $page,
        ])->get(config('app.jikan_url') . '/top/anime');

        if ($response->failed()) {
            Log::warning("Jikan API failed for syncing catalog page {$page}. Status: {$response->status()}");
            $response->throw();
        }

        $apiPayload = $response->json();
        $animeDataDtos = $this->mapApiPayloadToAnimeData($apiPayload);

        if (!empty($animeDataDtos)) {
            $this->bulkInsertAnimeWithMetaData($animeDataDtos, false);
        }

        $masterService = new MasterService();
        $masterService->clearCache();

        return $apiPayload['pagination']['has_next_page'] ?? false;
    }

    public function cleanupStaleAiringAnime(array $activeMalIds): void
    {
        if (empty($activeMalIds)) {
            return;
        }

        Anime::where('airing', true)
            ->whereNotIn('mal_id', $activeMalIds)
            ->update(['airing' => false]);
    }

    private function bulkInsertAnimeWithMetaData(
        array $animeApiData,
        bool $isNowAiringSync = false
    ): void {
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
                $animeApiData,
                $insertedAnimeRecords,
                'demographics',
                Demographic::class,
                AnimeDemographic::class,
                'demographic_id'
            );
            $this->processAndInsertAnimeMetadata(
                $animeApiData,
                $insertedAnimeRecords,
                'genres',
                Genre::class,
                AnimeGenre::class,
                'genre_id'
            );
            $this->processAndInsertAnimeMetadata(
                $animeApiData,
                $insertedAnimeRecords,
                'producers',
                Producer::class,
                AnimeProducer::class,
                'producer_id'
            );
            $this->processAndInsertAnimeMetadata(
                $animeApiData,
                $insertedAnimeRecords,
                'studios',
                Studio::class,
                AnimeStudio::class,
                'studio_id'
            );
            $this->processAndInsertAnimeMetadata(
                $animeApiData,
                $insertedAnimeRecords,
                'themes',
                Theme::class,
                AnimeTheme::class,
                'theme_id'
            );
        });
    }

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

        return ['animeRecords' => $animeRecordsToInsert, 'animeMalIds' => $animeMalIds];
    }

    private function mapApiPayloadToAnimeData(array $apiPayload): array
    {
        if (!isset($apiPayload['data']) || !is_array($apiPayload['data'])) {
            return [];
        }

        return collect($apiPayload['data'])
            ->unique('mal_id')
            ->map(fn(array $item) => AnimeData::fromArray($item))
            ->values()
            ->all();
    }

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
            if (!isset($malAnimeIdWithPivotData[$dbAnimeRecord->mal_id])) {
                continue;
            }

            foreach ($malAnimeIdWithPivotData[$dbAnimeRecord->mal_id] as $malId) {
                if (!isset($relatedIdsLookup[$malId])) {
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

        if (!empty($pivotTableDatas)) {
            $pivotModel::insertOrIgnore($pivotTableDatas);
        }
    }
}
