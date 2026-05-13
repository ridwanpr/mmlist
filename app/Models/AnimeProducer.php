<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property int $id
 * @property int $anime_id
 * @property int $producer_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer whereProducerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeProducer whereUpdatedAt($value)
 * @mixin \Eloquent
 */
#[Fillable(['anime_id', 'producer_id'])]
class AnimeProducer extends Pivot
{
    protected $table = 'anime_producers';

    public $timestamps = true;

    public $incrementing = true;
}
