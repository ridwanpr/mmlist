<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class AnimeService
{
    public function __construct() {}

    public function fetchNowAiring()
    {
        $response = Cache::remember('airing_anime', 3600, function () {
            $response = Http::get(config('app.jikan_url') . '/seasons/now');
            return $response->json();
        });

        return $response;
    }
}
