<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $trigger_id
 * @property string $name
 * @property int $importance
 * @property string|null $description
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $slug
 * @property-read Collection<int, \App\Models\AnimeTrigger> $animeTriggers
 * @property-read int|null $anime_triggers_count
 * @property-read Collection<int, \App\Models\Comment> $comments
 * @property-read int|null $comments_count
 * @property-read \App\Models\MasterTrigger $masterTrigger
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereImportance($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereSlug($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereTriggerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereUpdatedAt($value)
 * @mixin \Eloquent
 */
#[Fillable(['name', 'description', 'trigger_id', 'importance', 'slug'])]
class TriggerContent extends Model
{
    /**
     * @return BelongsTo<MasterTrigger, $this>
     */
    public function masterTrigger(): BelongsTo
    {
        return $this->belongsTo(MasterTrigger::class, 'trigger_id');
    }

    /**
     * @return HasMany<AnimeTrigger, $this>
     */
    public function animeTriggers(): HasMany
    {
        return $this->hasMany(AnimeTrigger::class);
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
