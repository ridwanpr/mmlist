<?php

namespace App\Http\Controllers;

use App\DTOs\AnimeTriggerData;
use App\DTOs\CommentData;
use App\Models\AnimeTrigger;
use App\Models\Comment;
use App\Services\AnimeService;
use App\Services\CommentService;
use App\Services\VoteService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(
        private AnimeService $animeService,
        private CommentService $commentService,
        private VoteService $voteService
    ) {}

    public function Index(): Response
    {
        $nowAiring = $this->animeService->getNowAiringFromDatabase();
        $topAnime = $this->animeService->fetchTopAnime();
        $staffPick = $this->animeService->getStaffPickAnime();
        $latestCommentsData = $this->commentService->getLatestCommentLimit(6);
        $latestVotesData = $this->voteService->getLatestVotesLimit(10);

        $latestComments = $latestCommentsData->map(fn (Comment $item) => CommentData::fromModel($item));
        $latestVotes = $latestVotesData->map(fn (AnimeTrigger $item) => AnimeTriggerData::fromModel($item));

        return Inertia::render('Home/Index', [
            'nowAiring' => $nowAiring,
            'topAnime' => $topAnime,
            'staffPick' => $staffPick,
            'latestComments' => $latestComments,
            'latestVotes' => $latestVotes,
        ]);
    }
}
