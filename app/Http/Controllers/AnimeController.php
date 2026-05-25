<?php

namespace App\Http\Controllers;

use App\DTOs\AnimeTriggerContextData;
use App\DTOs\CommentData;
use App\Models\Comment;
use App\Services\AnimeService;
use App\Services\CommentService;
use App\Services\VoteService;
use App\Services\WatchlistService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AnimeController extends Controller
{
    public function __construct(
        private AnimeService $animeService,
        private VoteService $voteService,
        private WatchlistService $watchlistService,
        private CommentService $commentService,
    ) {}

    public function show(string $slug): Response
    {
        $anime = $this->animeService->getAnimeInfo($slug);
        $triggers = $this->animeService->getAnimeTriggers($anime->id);

        $user = Auth::user();
        if ($user) {
            $userTriggerVote = $this->voteService->getUserTriggerVote($user->id, $anime->id);
            $watchlist = $this->watchlistService->findUserWatchlist($user->id, $anime->id);
        }

        $aiTriggerContext = $anime->triggerContexts->map(
            fn($item) => AnimeTriggerContextData::fromModel($item)
        );

        $topComments = $this->commentService->getTopComments('anime', $anime->id);
        $topCommentsDto = $topComments->map(fn(Comment $item) => CommentData::fromModel($item));
        $countComments = $this->commentService->getCommentCount('anime', $anime->id);

        return Inertia::render('Anime/Show', [
            'anime'           => $anime,
            'triggers'        => $triggers,
            'userTriggerVote' => $userTriggerVote ?? null,
            'userWatchlist'   => $watchlist ?? null,
            'aiTriggerContext' => $aiTriggerContext ?? null,
            'topComments'     => $topCommentsDto ?? null,
            'countComments'   => $countComments,
        ]);
    }
}
