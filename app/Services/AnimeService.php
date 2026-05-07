<?php

namespace App\Services;

use App\DTOs\AnimeData;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AnimeService
{
    public function __construct() {}

    /**
     * Fetch currently airing anime.
     *
     * @return array{data: AnimeData[]}
     */
    public function fetchNowAiring(int $limit = 12): array
    {
        try {
            return Cache::remember("airing_anime_limit:{$limit}", 3600, function () use ($limit) {
                $response = Http::withQueryParameters([
                    'limit' => $limit,
                ])->get(config('app.jikan_url').'/seasons/now');

                if ($response->failed()) {
                    Log::warning("Fetching Jikan API failed for now airing. Status: {$response->status()}", [
                        'body' => $response->body(),
                    ]);
                    $response->throw();
                }

                $animeData = $response->json();

                if (isset($animeData['data']) && is_array($animeData['data'])) {
                    $animeData['data'] = collect($animeData['data'])
                        ->unique('mal_id')
                        ->map(fn (array $item) => AnimeData::fromArray($item))
                        ->values()
                        ->all();
                }

                return $animeData;
            });
        } catch (Exception $e) {
            Log::error('Failed to fetch Now Airing anime: '.$e->getMessage());

            return ['data' => []];
        }
    }

    /**
     * Fetch top anime.
     *
     * @return array{data: AnimeData[]}
     */
    public function fetchTopAnime(int $limit = 8): array
    {
        try {
            return Cache::remember("top_anime_limit:{$limit}", 3600, function () use ($limit) {
                $response = Http::timeout(10)->withQueryParameters([
                    'limit' => $limit,
                ])->get(config('app.jikan_url').'/top/anime');

                if ($response->failed()) {
                    Log::warning("Jikan API failed for Top Anime. Status: {$response->status()}");
                    $response->throw();
                }

                $animeData = $response->json();

                if (isset($animeData['data']) && is_array($animeData['data'])) {
                    $animeData['data'] = collect($animeData['data'])
                        ->unique('mal_id')
                        ->map(fn (array $item) => AnimeData::fromArray($item))
                        ->values()
                        ->all();
                }

                return $animeData;
            });
        } catch (Exception $e) {
            Log::error('Failed to fetch Top Anime: '.$e->getMessage());

            return ['data' => []];
        }
    }
}
