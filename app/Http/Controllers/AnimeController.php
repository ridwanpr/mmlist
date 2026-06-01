<?php

namespace App\Http\Controllers;

use App\DTOs\AnimeRelationData;
use App\DTOs\AnimeTriggerContextData;
use App\DTOs\CommentData;
use App\DTOs\UserData;
use App\Models\AnimeRelation;
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

        $animeRelation = $anime->animeRelations->map(fn(AnimeRelation $item) => AnimeRelationData::fromModel($item));
        $user = Auth::user();

        $userData = $user ? UserData::fromModel($user) : null;

        // Check if the anime is NSFW and if the viewer is restricted
        $isRestrictedNsfw = ($anime->rating === 'Rx - Hentai') && (! $user || ! $user->show_nsfw);

        if ($isRestrictedNsfw) {
            return Inertia::render('Anime/Show', [
                'anime' => [
                    'title' => $anime->title,
                    'title_english' => $anime->title_english,
                    'rating' => $anime->rating,
                    'is_restricted' => true,
                ],
                'triggers' => [],
                'userTriggerVote' => null,
                'userWatchlist' => null,
                'aiTriggerContext' => null,
                'topComments' => null,
                'countComments' => 0,
                'user' => $userData,
                'animeRelation' => $animeRelation
            ]);
        }

        // Standard logic for authorized viewers
        $triggers = $this->animeService->getAnimeTriggers($anime->id);
        $userTriggerVote = $user ? $this->voteService->getUserTriggerVote($user->id, $anime->id) : null;
        $watchlist = $user ? $this->watchlistService->findUserWatchlist($user->id, $anime->id) : null;

        $aiTriggerContext = $anime->triggerContexts->map(
            fn($item) => AnimeTriggerContextData::fromModel($item)
        );

        $topComments = $this->commentService->getTopComments('anime', $anime->id);
        $topCommentsDto = $topComments->map(fn(Comment $item) => CommentData::fromModel($item));
        $countComments = $this->commentService->getCommentCount('anime', $anime->id);
        $countTriggerComments = $this->commentService->getTriggerCommentsCount($anime->id);

        $animeRecs = $this->animeService->getAnimeRecs($anime);

        return Inertia::render('Anime/Show', [
            'anime' => $anime,
            'triggers' => $triggers,
            'userTriggerVote' => $userTriggerVote,
            'userWatchlist' => $watchlist,
            'aiTriggerContext' => $aiTriggerContext,
            'topComments' => $topCommentsDto,
            'countComments' => $countComments,
            'user' => $userData,
            'countTriggerComments' => $countTriggerComments,
            'animeRelation' => $animeRelation,
            'animeRecs' => $animeRecs
        ]);
    }
}
