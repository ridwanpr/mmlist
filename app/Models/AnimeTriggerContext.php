<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property int $anime_id
 * @property int $trigger_content_id
 * @property string|null $ai_summary
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\TriggerContent $triggerContent
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTriggerContext newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTriggerContext newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTriggerContext query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTriggerContext whereAiSummary($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTriggerContext whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTriggerContext whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTriggerContext whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTriggerContext whereTriggerContentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|AnimeTriggerContext whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class AnimeTriggerContext extends Model
{
    protected $guarded = [];

    public function triggerContent()
    {
        return $this->belongsTo(TriggerContent::class);
    }
}
