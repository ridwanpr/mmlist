<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AnimeTriggerContext extends Model
{
    protected $guarded = [];

    public function triggerContent()
    {
        return $this->belongsTo(TriggerContent::class);
    }
}
