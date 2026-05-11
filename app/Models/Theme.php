<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Theme extends Model
{
    /**
     * @return BelongsToMany<Anime, $this, AnimeTheme>
     */
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_themes', 'theme_id', 'anime_id')
            ->using(AnimeTheme::class)
            ->withTimestamps();
    }
}
