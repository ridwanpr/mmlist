<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Services\AnimeService;
use App\Services\CommentService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function __construct(
        private CommentService $commentService,
        private AnimeService $animeService
    ) {}

    public function store(StoreCommentRequest $request)
    {
        $validated = $request->validated();
        $user = Auth::user();
        $anime = $this->animeService->getAnimeInfo($validated['slug']);
        $this->commentService->storeComment($user->id, $anime->id, $validated);

        Inertia::flash('success', 'Comment submitted');
        return back();
    }

    public function getAnimeComment(string $animeSlug)
    {
        return Inertia::render('AnimeComment/Index');
    }
}
