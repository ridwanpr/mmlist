<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Producer extends Model
{
    /**
     * @return BelongsToMany<Anime, $this, AnimeProducer>
     */
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_producers', 'producer_id', 'anime_id')
            ->using(AnimeProducer::class)
            ->withTimestamps();
    }
}
