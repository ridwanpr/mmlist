<?php

namespace App\Services;

use App\DTOs\GenreData;
use App\DTOs\ThemeData;
use App\Models\Anime;
use App\Models\Genre;
use App\Models\Theme;
use Illuminate\Support\Collection;

class MasterService
{
    public function getGenres()
    {
        $genres = Genre::whereNotIn('name', ['Hentai', 'Erotica'])
            ->orderBy('name', 'asc')
            ->get();

        return $genres->map(fn($item) => GenreData::fromModel($item))
            ->values()->toArray();
    }

    public function getThemes()
    {
        $genres = Theme::orderBy('name', 'asc')
            ->get();

        return $genres->map(fn($item) => ThemeData::fromModel($item))
            ->values()->toArray();
    }

    public function getType(): Collection
    {
        $type = Anime::where('type', '!=', null)
            ->orderBy('type', 'desc')
            ->distinct()->pluck('type');

        return $type;
    }

    public function getSeason(): Collection
    {
        return Anime::where('season', '!=', null)
            ->orderBy('season', 'asc')
            ->distinct()->pluck('season');
    }
}
