<?php

namespace App\Services;

use App\DTOs\AnimeTriggerData;
use App\Models\AnimeTrigger;
use Illuminate\Support\Collection;

class VoteService
{
    public function voteAnime(AnimeTriggerData $data): void
    {
        AnimeTrigger::create($data->toArray());
    }

    /** @return Collection<int, AnimeTriggerData> */
    public function getUserTriggerVote(int $userId, int $animeId): Collection
    {
        return AnimeTrigger::where('user_id', $userId)
            ->where('anime_id', $animeId)
            ->get();
    }
}
