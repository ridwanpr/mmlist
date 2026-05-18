<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $mal_id
 * @property string $slug
 * @property string $url
 * @property string|null $season
 * @property int|null $year
 * @property array<array-key, mixed>|null $images
 * @property array<array-key, mixed>|null $trailer
 * @property bool $approved
 * @property array<array-key, mixed>|null $titles
 * @property string $title
 * @property string|null $title_english
 * @property string|null $title_japanese
 * @property array<array-key, mixed>|null $title_synonyms
 * @property string|null $type
 * @property string|null $source
 * @property int|null $episodes
 * @property string|null $status
 * @property bool $airing
 * @property array<array-key, mixed>|null $aired
 * @property string|null $duration
 * @property string|null $rating
 * @property numeric|null $score
 * @property string|null $synopsis
 * @property string|null $background
 * @property int|null $rank
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $from
 * @property Carbon|null $to
 * @property string|null $from_to_string
 * @property string|null $ai_advisory
 * @property-read Collection<int, AnimeTrigger> $animeTriggers
 * @property-read int|null $anime_triggers_count
 * @property-read Watchlist|AnimeTheme|AnimeStudio|AnimeProducer|AnimeGenre|AnimeDemographic|null $pivot
 * @property-read Collection<int, Demographic> $demographics
 * @property-read int|null $demographics_count
 * @property-read Collection<int, Genre> $genres
 * @property-read int|null $genres_count
 * @property-read Collection<int, Producer> $producers
 * @property-read int|null $producers_count
 * @property-read Collection<int, Studio> $studios
 * @property-read int|null $studios_count
 * @property-read Collection<int, Theme> $themes
 * @property-read int|null $themes_count
 * @property-read Collection<int, User> $watchlists
 * @property-read int|null $watchlists_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereAiAdvisory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereAired($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereAiring($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereApproved($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereBackground($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereDuration($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereEpisodes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereFrom($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereFromToString($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereImages($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereRank($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereRating($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereSeason($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereSource($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereSynopsis($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTitleEnglish($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTitleJapanese($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTitleSynonyms($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTitles($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTo($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereTrailer($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Anime whereYear($value)
 *
 * @mixin \Eloquent
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
    'slug',
    'from',
    'to',
    'from_to_string',
    'ai_advisory',
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
            'from' => 'datetime',
            'to' => 'datetime',
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

    /**
     * @return HasMany<AnimeTrigger, $this>
     */
    public function animeTriggers(): HasMany
    {
        return $this->hasMany(AnimeTrigger::class);
    }

    /**
     * @return BelongsToMany<User, $this, Watchlist>
     */
    public function watchlists(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'watchlists', 'anime_id', 'user_id')
            ->using(Watchlist::class)
            ->withPivot('status', 'progress', 'score', 'note')
            ->withTimestamps();
    }
}
