<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperAnimeStudio
 */
#[Fillable(['anime_id', 'studio_id'])]
class AnimeStudio extends Model
{
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_studios', 'anime_id', 'studio_id')
            ->withTimestamps();
    }
}
