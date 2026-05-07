<?php

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class AnimeService
{
    public function __construct() {}

    public function fetchNowAiring(int $limit = 12)
    {
        try {
            return Cache::remember("airing_anime_limit:{$limit}", 3600, function () use ($limit) {
                $response = Http::withQueryParameters([
                    'limit' => $limit,
                ])->get(config('app.jikan_url').'/seasons/now');

                if ($response->failed()) {
                    Log::warning("Fetching Jikan API failed for now airinig. Status: {$response->status()}", [
                        'body' => $response->body(),
                    ]);
                    $response->throw();
                }

                $animeData = $response->json();

                if (isset($animeData['data']) && is_array($animeData['data'])) {
                    $animeData['data'] = collect($animeData['data'])
                        ->unique('mal_id')
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

    public function fetchTopAnime(int $limit = 8)
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
