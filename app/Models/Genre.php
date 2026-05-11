<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Genre extends Model
{
    /**
     * @return BelongsToMany<Anime, $this, AnimeGenre>
     */
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_genres', 'genre_id', 'anime_id')
            ->using(AnimeGenre::class)
            ->withTimestamps();
    }
}
