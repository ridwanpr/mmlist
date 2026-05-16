<?php

namespace App\Services;

use App\DTOs\GenreData;
use App\DTOs\ThemeData;
use App\Models\Anime;
use App\Models\Genre;
use App\Models\Theme;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;

class MasterService
{
    public function getGenres()
    {
        $cachedGenres = Cache::get('genres');
        if ($cachedGenres) {
            return $cachedGenres;
        }

        $genres = Genre::whereNotIn('name', ['Hentai', 'Erotica'])
            ->orderBy('name', 'asc')
            ->get();

        $genreDtos = $genres->map(fn($item) => GenreData::fromModel($item))
            ->values()->toArray();

        Cache::put('genres', $genreDtos, now()->addDays(30));

        return $genreDtos;
    }

    public function getThemes()
    {
        $cacheThemes = Cache::get('themes');
        if ($cacheThemes) {
            return $cacheThemes;
        }

        $themes = Theme::orderBy('name', 'asc')
            ->get();

        $themesDtos = $themes->map(fn($item) => ThemeData::fromModel($item))
            ->values()->toArray();

        Cache::put('themes', $themesDtos, now()->addDays(30));

        return $themesDtos;
    }

    public function getType(): Collection
    {
        $cachedType = Cache::get('type');

        if ($cachedType) {
            return collect($cachedType);
        }

        $type = Anime::where('type', '!=', null)
            ->orderBy('type', 'desc')
            ->distinct()
            ->pluck('type');

        Cache::put('type', $type->toArray(), now()->addDays(30));

        return $type;
    }

    public function getSeason(): Collection
    {
        $cachedSeason = Cache::get('season');

        if ($cachedSeason) {
            return collect($cachedSeason);
        }

        $season = Anime::where('season', '!=', null)
            ->orderBy('season', 'asc')
            ->distinct()->pluck('season');

        Cache::put('season', $season->toArray(), now()->addDays(30));

        return $season;
    }

    public function getRating()
    {
        $cachedRating = Cache::get('rating');
        if ($cachedRating) {
            return collect($cachedRating);
        }

        $rating = Anime::where('rating', '!=', null)
            ->where('rating', '!=', 'Rx - Hentai')
            ->orderBy('rating', 'asc')
            ->distinct()->pluck('rating');

        Cache::put('rating', $rating->toArray(), now()->addDays(30));
        return $rating;
    }

    public function clearCache(): void
    {
        Cache::forget('genres');
        Cache::forget('themes');
        Cache::forget('type');
        Cache::forget('season');
    }
}
