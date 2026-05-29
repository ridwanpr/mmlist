<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @property int $id
 * @property int $anime_id
 * @property int $related_anime_id
 * @property string $relation_type
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeRelation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeRelation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeRelation query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeRelation whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeRelation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeRelation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeRelation whereRelatedAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeRelation whereRelationType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeRelation whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AnimeRelation extends Pivot
{
    protected $table = 'anime_relations';
    protected $fillable = ['anime_id', 'related_anime_id', 'relation_type', 'created_at', 'updated_at'];

    public function anime(): BelongsTo
    {
        return $this->belongsTo(Anime::class, 'related_anime_id');
    }
}
