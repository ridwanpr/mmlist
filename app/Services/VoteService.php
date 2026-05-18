<?php

namespace App\Services;

use App\DTOs\AnimeTriggerData;
use App\Models\AnimeTrigger;
use Illuminate\Support\Collection;

class VoteService
{
    public function voteAnime(AnimeTriggerData $data): void
    {
        AnimeTrigger::updateOrCreate([
            'anime_id' => $data->anime_id,
            'trigger_content_id' => $data->trigger_content_id,
            'user_id' => $data->user_id,
        ], [
            'is_appear' => $data->is_appear,
            'severity' => $data->severity,
            'framing' => $data->framing,
        ]);
    }

    /** @return Collection<int, AnimeTriggerData> */
    public function getUserTriggerVote(int $userId, int $animeId): Collection
    {
        $data = AnimeTrigger::where('user_id', $userId)
            ->where('anime_id', $animeId)
            ->get();

        return $data->map(fn ($item) => AnimeTriggerData::fromModel($item));
    }
}
