<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin IdeHelperAnimeDemographic
 */
#[Fillable(['anime_id', 'demographic_id'])]
class AnimeDemographic extends Model
{
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_demographics', 'anime_id', 'demographic_id')
            ->withTimestamps();
    }
}
