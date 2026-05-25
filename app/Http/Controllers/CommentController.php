<?php

namespace App\Http\Controllers;

use App\DTOs\CommentData;
use App\DTOs\PaginatedCommentData;
use Illuminate\Http\Request;
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

    public function store(Request $request)
    {
        $validated = $request->validate([
            'body' => 'required',
            'slug' => 'required',
            'parent_comment_id' => 'nullable|exists:comments,id'
        ]);

        $user = Auth::user();
        $anime = $this->animeService->getAnimeInfo($validated['slug']);

        if ($request->parent_comment_id) {
            $parent = $this->commentService->findCommentFirst($request->parent_comment_id);
            $this->commentService->storeComment($user->id, $anime->id, $validated, $parent->id);
        } else {
            $this->commentService->storeComment($user->id, $anime->id, $validated);
        }

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
        
        $transformedPaginator = $animeComments->through(
            fn(Comment $item): CommentData => CommentData::fromModel($item)
        );

        $paginatedComment = PaginatedCommentData::fromPaginator($transformedPaginator);

        return Inertia::render('AnimeComment/Index', [
            'anime' => $anime,
            'paginatedComment' => $paginatedComment,
            'sortBy' => $sortBy
        ]);
    }

    public function upvote(Request $request, int $commentId)
    {
        $user = Auth::user();
        $this->commentService->toggleCommentUpvote($commentId, $user->id);

        return back();
    }
}
