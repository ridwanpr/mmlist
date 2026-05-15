<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $mal_id
 * @property string $type
 * @property string $name
 * @property string $url
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read AnimeProducer|null $pivot
 * @property-read Collection<int, Anime> $animes
 * @property-read int|null $animes_count
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Producer whereUrl($value)
 *
 * @mixin \Eloquent
 */
#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Producer extends Model
{
    /**
     * @return BelongsToMany<Anime, $this, AnimeProducer>
     */
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_producers', 'producer_id', 'anime_id')
            ->using(AnimeProducer::class)
            ->withTimestamps();
    }
}
