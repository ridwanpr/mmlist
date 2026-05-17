<?php

namespace App\Http\Controllers;

use App\Services\AnimeService;
use App\Services\GeminiService;
use App\Services\VoteService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class AnimeController extends Controller
{
    public function __construct(
        private AnimeService $animeService,
        private VoteService $voteService
    ) {}

    public function show(string $slug): Response
    {
        $anime = $this->animeService->getAnimeInfo($slug);
        $triggers = $this->animeService->getAnimeTriggers($anime->id);

        $user = Auth::user();
        if ($user) {
            $userTriggerVote = $this->voteService->getUserTriggerVote($user->id, $anime->id);
        }

        return Inertia::render('Anime/Show', [
            'anime' => $anime,
            'triggers' => $triggers,
            'userTriggerVote' => $userTriggerVote ?? null,
        ]);
    }
}
