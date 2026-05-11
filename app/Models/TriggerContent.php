<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
