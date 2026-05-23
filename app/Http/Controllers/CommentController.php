<?php

namespace App\Http\Controllers;

use App\DTOs\CommentData;
use App\DTOs\PaginatedCommentData;
use App\Http\Requests\DiscussionRequest;
use Illuminate\Http\Request;
use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
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

    public function getAnimeComment(Request $request, string $animeSlug)
    {
        $sortInput = $request->query('sort');
        $allowedSorts = ['latest', 'most-loved', 'oldest'];
        $sortBy = in_array($sortInput, $allowedSorts) ? $sortInput : 'most-loved';
        
        $anime = $this->animeService->getAnimeInfo($animeSlug);
        $animeComments = $this->commentService->getAnimeComments($anime->id, 25, $sortBy);

        $commentDto = $animeComments->through(fn(Comment $item): CommentData => CommentData::fromModel($item));
        $paginatedComment = PaginatedCommentData::fromPaginator($commentDto);

        return Inertia::render('AnimeComment/Index', [
            'anime' => $anime,
            'paginatedComment' => $paginatedComment,
            'sortBy' => $sortBy
        ]);
    }
}
