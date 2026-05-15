<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $anime_id
 * @property int $studio_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio whereStudioId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeStudio whereUpdatedAt($value)
 *
 * @mixin \Eloquent
 */
#[Fillable(['anime_id', 'studio_id'])]
class AnimeStudio extends Pivot
{
    protected $table = 'anime_studios';

    public $timestamps = true;

    public $incrementing = true;
}
