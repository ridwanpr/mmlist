<?php

namespace App\Services;

use App\DTOs\AnimeTriggerData;
use App\Models\AnimeTrigger;

class VoteService
{
    public function voteAnime(AnimeTriggerData $data): void
    {
        AnimeTrigger::create($data->toArray());
    }
}
