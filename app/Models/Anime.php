<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @mixin \Illuminate\Database\Eloquent\Builder
 */
#[Fillable([
    'mal_id',
    'url',
    'season',
    'year',
    'images',
    'trailer',
    'approved',
    'titles',
    'title',
    'title_english',
    'title_japanese',
    'title_synonyms',
    'type',
    'source',
    'episodes',
    'status',
    'rank',
    'airing',
    'aired',
    'duration',
    'rating',
    'score',
    'synopsis',
    'background',
])]

class Anime extends Model
{
    protected function casts(): array
    {
        return [
            'images' => 'array',
            'trailer' => 'array',
            'titles' => 'array',
            'title_synonyms' => 'array',
            'aired' => 'array',
            'approved' => 'boolean',
            'airing' => 'boolean',
            'score' => 'decimal:2',
        ];
    }

    public function demographics(): BelongsToMany
    {
        return $this->belongsToMany(Demographic::class, 'anime_demographics', 'anime_id', 'demographic_id')
            ->withTimestamps();
    }
}
