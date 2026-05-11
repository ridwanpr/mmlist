<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Studio extends Model
{
    /**
     * @return BelongsToMany<Anime, $this, AnimeStudio>
     */
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_studios', 'studio_id', 'anime_id')
            ->using(AnimeStudio::class)
            ->withTimestamps();
    }
}
