<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $trigger_content_id
 * @property int $anime_id
 * @property int $user_id
 * @property int $is_appear
 * @property string|null $severity
 * @property string|null $framing
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read Anime $anime
 * @property-read TriggerContent $triggerContent
 * @property-read User $user
 *
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger whereFraming($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger whereIsAppear($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger whereSeverity($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger whereTriggerContentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTrigger whereUserId($value)
 *
 * @mixin \Eloquent
 */
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
