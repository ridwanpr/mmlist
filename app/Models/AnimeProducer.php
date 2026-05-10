<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperAnimeProducer
 */
#[Fillable(['anime_id', 'producer_id'])]
class AnimeProducer extends Model
{
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_producers', 'anime_id', 'producer_id')
            ->withTimestamps();
    }
}
