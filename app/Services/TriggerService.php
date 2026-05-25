<?php

namespace App\Services;

use App\Models\TriggerContent;

class TriggerService
{
    public function findTriggerContentBySlug(string $slug)
    {
        return TriggerContent::where('slug', $slug)
            ->with('animeTriggers')->firstOrFail();
    }
}
