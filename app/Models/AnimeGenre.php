<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperAnimeGenre
 */
#[Fillable(['anime_id', 'genre_id'])]
class AnimeGenre extends Model
{
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_genres', 'anime_id', 'genre_id')
            ->withTimestamps();
    }
}
