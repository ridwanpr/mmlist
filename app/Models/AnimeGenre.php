<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $anime_id
 * @property int $genre_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre whereGenreId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeGenre whereUpdatedAt($value)
 * @mixin \Eloquent
 */
#[Fillable(['anime_id', 'genre_id'])]
class AnimeGenre extends Pivot
{
    protected $table = 'anime_genres';

    public $timestamps = true;

    public $incrementing = true;
}
