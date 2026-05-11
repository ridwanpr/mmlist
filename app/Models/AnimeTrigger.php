<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['trigger_content_id', 'anime_id', 'user_id', 'is_appear', 'severity', 'framing'])]
class AnimeTrigger extends Model
{
    protected $table = 'anime_triggers';

    public $timestamps = true;

    public $incrementing = true;

    /**
     * @return BelongsTo<User, $this>
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return BelongsTo<Anime, $this>
     */
    public function anime(): BelongsTo
    {
        return $this->belongsTo(Anime::class);
    }

    /**
     * @return BelongsTo<TriggerContent, $this>
     */
    public function triggerContent(): BelongsTo
    {
        return $this->belongsTo(TriggerContent::class);
    }
}
