<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable(['trigger_id', 'anime_id', 'user_id', 'is_appear', 'severity', 'framing'])]
class AnimeTrigger extends Pivot
{
    protected $table = 'anime_triggers';

    public $timestamps = true;

    public $incrementing = true;
}
