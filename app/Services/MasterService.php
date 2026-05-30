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
     * @return Collection<int, GenreData>
     */
    public function getGenres(): Collection
    {
        $raw = Cache::remember('genres', now()->addDays(30), function () {
            return Genre::whereNotIn('name', ['Hentai', 'Erotica'])
                ->orderBy('name', 'asc')
                ->get()
                ->map(fn(Genre $item) => [
                    'id' => $item->id,
                    'mal_id' => $item->mal_id,
                    'type' => $item->type,
                    'name' => $item->name,
                    'url' => $item->url,
                ])
                ->all();
        });

        return collect($raw)->map(fn(array $data) => GenreData::fromArray($data));
    }

    /**
     * @return Collection<int, ThemeData>
     */
    public function getThemes(): Collection
    {
        $raw = Cache::remember('themes', now()->addDays(30), function () {
            return Theme::orderBy('name', 'asc')
                ->get()
                ->map(fn(Theme $item) => [
                    'id' => $item->id,
                    'mal_id' => $item->mal_id,
                    'type' => $item->type,
                    'name' => $item->name,
                    'url' => $item->url,
                ])
                ->all();
        });

        return collect($raw)->map(fn(array $data) => ThemeData::fromArray($data));
    }

    /**
     * @return Collection<int, string>
     */
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

    /**
     * @return Collection<int, string>
     */
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

    /**
     * @return Collection<int, string>
     */
    public function getRating(): Collection
    {
        $raw = Cache::rememberForever('rating', function () {
            return Anime::whereNotNull('rating')
                ->orderBy('rating', 'asc')
                ->distinct()
                ->pluck('rating')
                ->all();
        });

        return collect($raw);
    }

    /**
     * @return array<int, int>
     */
    public function getAnimeYear(): array
    {
        return Cache::remember('year', now()->plus(days: 14), function () {
            return Anime::whereNotNull('year')
                ->orderBy('year', 'desc')
                ->distinct()
                ->pluck('year')
                ->toArray();
        });
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
