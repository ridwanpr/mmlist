<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

#[Fillable(['name', 'description'])]
class MasterTrigger extends Model
{
    /**
     * @return HasMany<TriggerContent, $this>
     */
    public function triggerContents(): HasMany
    {
        return $this->hasMany(TriggerContent::class);
    }
}
