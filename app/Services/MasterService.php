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
    /**
     * @return Collection<GenreData>
     */
    public function getGenres(): Collection
    {
        $raw = Cache::remember('genres', now()->addDays(30), function () {
            return Genre::whereNotIn('name', ['Hentai', 'Erotica'])
                ->orderBy('name', 'asc')
                ->get()
                ->map(fn(Genre $item) => [
                    'id'     => $item->id,
                    'mal_id' => $item->mal_id,
                    'type'   => $item->type,
                    'name'   => $item->name,
                    'url'    => $item->url,
                ])
                ->all();
        });

        return collect($raw)->map(fn(array $data) => GenreData::fromArray($data));
    }

    /**
     * @return Collection<ThemeData>
     */
    public function getThemes(): Collection
    {
        $raw = Cache::remember('themes', now()->addDays(30), function () {
            return Theme::orderBy('name', 'asc')
                ->get()
                ->map(fn(Theme $item) => [
                    'id'     => $item->id,
                    'mal_id' => $item->mal_id,
                    'type'   => $item->type,
                    'name'   => $item->name,
                    'url'    => $item->url,
                ])
                ->all();
        });

        return collect($raw)->map(fn(array $data) => ThemeData::fromArray($data));
    }

    public function getType(): Collection
    {
        $raw = Cache::rememberForever('type', function () {
            return Anime::whereNotNull('type')
                ->orderBy('type', 'desc')
                ->distinct()
                ->pluck('type')
                ->all();
        });

        return collect($raw);
    }

    public function getSeason(): Collection
    {
        $raw = Cache::rememberForever('season', function () {
            return Anime::whereNotNull('season')
                ->orderBy('season', 'asc')
                ->distinct()
                ->pluck('season')
                ->all();
        });

        return collect($raw);
    }

    public function getRating(): Collection
    {
        $raw = Cache::rememberForever('rating', function () {
            return Anime::whereNotNull('rating')
                ->where('rating', '!=', 'Rx - Hentai')
                ->orderBy('rating', 'desc')
                ->distinct()
                ->pluck('rating')
                ->all();
        });

        return collect($raw);
    }

    public function clearCache(): void
    {
        Cache::forget('genres');
        Cache::forget('themes');
        Cache::forget('type');
        Cache::forget('season');
        Cache::forget('rating');
    }
}
