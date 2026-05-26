<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $anime_id
 * @property int $demographic_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic whereDemographicId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeDemographic whereUpdatedAt($value)
 * @mixin \Eloquent
 */
#[Fillable(['anime_id', 'demographic_id'])]
class AnimeDemographic extends Pivot
{
    protected $table = 'anime_demographics';

    public $timestamps = true;

    public $incrementing = true;
}
