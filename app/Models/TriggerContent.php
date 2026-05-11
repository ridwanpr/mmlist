<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['name', 'description', 'trigger_id'])]
class TriggerContent extends Model
{
    /**
     * @return BelongsTo<MasterTrigger, $this>
     */
    public function masterTrigger(): BelongsTo
    {
        return $this->belongsTo(MasterTrigger::class);
    }

    /**
     * @return BelongsToMany<Anime, $this, AnimeTrigger>
     */
    public function animes(): BelongsToMany
    {
        return $this->belongsToMany(Anime::class, 'anime_triggers', 'trigger_id', 'anime_id')
            ->using(AnimeTrigger::class)
            ->withTimestamps();
    }
}
