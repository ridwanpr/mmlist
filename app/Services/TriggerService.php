<?php

namespace App\Services;

use App\DTOs\AnimeTriggerStatData;
use App\Models\AnimeTrigger;
use App\Models\TriggerContent;

class TriggerService
{
    public function findTriggerContentBySlug(string $slug)
    {
        return TriggerContent::where('slug', $slug)
            ->with('animeTriggers')->firstOrFail();
    }

    public function getTriggerStat(int $animeId, int $triggerContentId): AnimeTriggerStatData
    {
        $stats = AnimeTrigger::where('anime_id', $animeId)
            ->where('trigger_content_id', $triggerContentId)
            ->selectRaw("
            COUNT(*) as total_reports,
            SUM(CASE WHEN is_appear = 1 THEN 1 ELSE 0 END) as appear_yes_count,
            SUM(CASE WHEN is_appear = 0 THEN 1 ELSE 0 END) as appear_no_count,
            SUM(CASE WHEN severity = 'Mild' THEN 1 ELSE 0 END) as severity_mild,
            SUM(CASE WHEN severity = 'Moderate' THEN 1 ELSE 0 END) as severity_moderate,
            SUM(CASE WHEN severity = 'Severe' THEN 1 ELSE 0 END) as severity_severe,
            SUM(CASE WHEN framing = 'Serious' THEN 1 ELSE 0 END) as framing_serious,
            SUM(CASE WHEN framing = 'Neutral' THEN 1 ELSE 0 END) as framing_neutral,
            SUM(CASE WHEN framing = 'Romanticized' THEN 1 ELSE 0 END) as framing_romanticized,
            SUM(CASE WHEN framing = 'Comedic' THEN 1 ELSE 0 END) as framing_comedic
        ")
            ->first();

        return AnimeTriggerStatData::fromArray($stats ? $stats->toArray() : []);
    }
}
