<?php

namespace App\Http\Controllers;

use App\DTOs\AnimeTriggerData;
use App\DTOs\CommentData;
use App\Models\AnimeTrigger;
use App\Models\Comment;
use App\Services\AnimeService;
use App\Services\CommentService;
use App\Services\VoteService;
use Illuminate\Support\Facades\Cache;
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
        $feeds = Cache::remember('homepage_feeds', 60, function () {
            $latestCommentsData = $this->commentService->getLatestCommentLimit(6);
            $latestVotesData = $this->voteService->getLatestVotesLimit(10);

            return [
                'latestComments' => $latestCommentsData->map(fn(Comment $item) => CommentData::fromModel($item))->all(),
                'latestVotes' => $latestVotesData->map(fn(AnimeTrigger $item) => AnimeTriggerData::fromModel($item))->all(),
            ];
        });

        $nowAiring = $this->animeService->getNowAiringFromDatabase();
        $topAnime = $this->animeService->fetchTopAnime();
        $staffPick = $this->animeService->getStaffPickAnime();

        return Inertia::render('Home/Index', [
            'nowAiring' => $nowAiring,
            'topAnime' => $topAnime,
            'staffPick' => $staffPick,
            'latestComments' => $feeds['latestComments'],
            'latestVotes' => $feeds['latestVotes'],
        ]);
    }
}
