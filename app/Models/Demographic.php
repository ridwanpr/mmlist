<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

/**
 * @property int $id
 * @property int $mal_id
 * @property string $type
 * @property string $name
 * @property string $url
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\AnimeDemographic|null $pivot
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Anime> $animes
 * @property-read int|null $animes_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereMalId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Demographic whereUrl($value)
 * @mixin \Eloquent
 */
#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Demographic extends Model
{
    /**
     * @return BelongsToMany<Anime, $this, AnimeDemographic>
     */
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_demographics', 'demographic_id', 'anime_id')
            ->using(AnimeDemographic::class)
            ->withTimestamps();
    }
}
