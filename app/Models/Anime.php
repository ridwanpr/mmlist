<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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
    'slug'
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

    /**
     * @return BelongsToMany<Demographic, $this, AnimeDemographic>
     */
    public function demographics(): BelongsToMany
    {
        return $this->belongsToMany(Demographic::class, 'anime_demographics', 'anime_id', 'demographic_id')
            ->using(AnimeDemographic::class)
            ->withTimestamps();
    }

    /**
     * @return BelongsToMany<Genre, $this, AnimeGenre>
     */
    public function genres(): BelongsToMany
    {
        return $this->belongsToMany(Genre::class, 'anime_genres', 'anime_id', 'genre_id')
            ->using(AnimeGenre::class)
            ->withTimestamps();
    }

    /**
     * @return BelongsToMany<Producer, $this, AnimeProducer>
     */
    public function producers(): BelongsToMany
    {
        return $this->belongsToMany(Producer::class, 'anime_producers', 'anime_id', 'producer_id')
            ->using(AnimeProducer::class)
            ->withTimestamps();
    }

    /**
     * @return BelongsToMany<Studio, $this, AnimeStudio>
     */
    public function studios(): BelongsToMany
    {
        return $this->belongsToMany(Studio::class, 'anime_studios', 'anime_id', 'studio_id')
            ->using(AnimeStudio::class)
            ->withTimestamps();
    }

    /**
     * @return BelongsToMany<Theme, $this, AnimeTheme>
     */
    public function themes(): BelongsToMany
    {
        return $this->belongsToMany(Theme::class, 'anime_themes', 'anime_id', 'theme_id')
            ->using(AnimeTheme::class)
            ->withTimestamps();
    }
}
