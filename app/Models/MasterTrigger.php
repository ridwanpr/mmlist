<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * @property int $id
 * @property string $name
 * @property int $importance
 * @property string|null $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\TriggerContent> $triggerContents
 * @property-read int|null $trigger_contents_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MasterTrigger newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MasterTrigger newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MasterTrigger query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MasterTrigger whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MasterTrigger whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MasterTrigger whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MasterTrigger whereImportance($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MasterTrigger whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MasterTrigger whereUpdatedAt($value)
 * @mixin \Eloquent
 */
#[Fillable(['name', 'description', 'importance'])]
class MasterTrigger extends Model
{
    /**
     * @return HasMany<TriggerContent, $this>
     */
    public function triggerContents(): HasMany
    {
        return $this->hasMany(TriggerContent::class, 'trigger_id');
    }
}
