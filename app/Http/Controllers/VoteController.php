<?php

namespace App\Http\Controllers;

use App\DTOs\AnimeTriggerData;
use App\Http\Requests\VoteAnimeTriggerRequest;
use App\Services\AnimeService;
use App\Services\VoteService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class VoteController extends Controller
{
    public function __construct(
        private VoteService $voteService,
        private AnimeService $animeService
    ) {}

    public function voteAnimeTrigger(
        VoteAnimeTriggerRequest $request,
        int $triggerContentId,
        string $animeSlug
    ) {
        $anime = $this->animeService->getAnimeInfo($animeSlug);
        $userId = Auth::id();

        $dto = AnimeTriggerData::fromRequest(
            $request,
            $anime->id,
            $userId,
            $triggerContentId
        );

        $this->voteService->voteAnime($dto);

        Inertia::flash('success', 'Vote submitted');

        return back();
    }
}
