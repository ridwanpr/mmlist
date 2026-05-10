<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperAnimeTheme
 */
#[Fillable(['anime_id', 'theme_id'])]
class AnimeTheme extends Model
{
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_themes', 'anime_id', 'theme_id')
            ->withTimestamps();
    }
}
