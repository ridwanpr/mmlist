<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Demographic extends Model
{
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_demographics', 'demographic_id', 'anime_id')
            ->withTimestamps();
    }
}
