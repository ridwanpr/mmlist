<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property int $trigger_id
 * @property string $name
 * @property int $importance
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\AnimeTrigger> $animeTriggers
 * @property-read int|null $anime_triggers_count
 * @property-read \App\Models\MasterTrigger $masterTrigger
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereImportance($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereTriggerId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|TriggerContent whereUpdatedAt($value)
 * @mixin \Eloquent
 */
#[Fillable(['name', 'description', 'trigger_id', 'importance'])]
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
}
