<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property int $id
 * @property int $anime_id
 * @property int $theme_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme whereThemeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTheme whereUpdatedAt($value)
 * @mixin \Eloquent
 */
#[Fillable(['anime_id', 'theme_id'])]
class AnimeTheme extends Pivot
{
    protected $table = 'anime_themes';

    public $timestamps = true;

    public $incrementing = true;
}
