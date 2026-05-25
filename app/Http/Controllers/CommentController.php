<?php

namespace App\Http\Controllers;

use App\DTOs\CommentData;
use App\DTOs\PaginatedCommentData;
use App\Models\Comment;
use App\Services\AnimeService;
use App\Services\CommentService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentController extends Controller
{
    public function __construct(
        private CommentService $commentService,
        private AnimeService $animeService,
    ) {}

    public function store(Request $request)
    {
        $validated = $request->validate([
            'body' => 'required|string',
            'slug' => 'required|string',
            'parent_comment_id' => 'nullable|exists:comments,id',
        ]);

        $user = Auth::user();
        $anime = $this->animeService->getAnimeInfo($validated['slug']);

        $parentId = $validated['parent_comment_id']
            ? $this->commentService->findCommentFirst($validated['parent_comment_id'])->id
            : null;

        $this->commentService->storeComment($user->id, 'anime', $anime->id, $validated, $parentId);

        Inertia::flash('success', 'Comment submitted');

        return back();
    }

    public function getAnimeComment(Request $request, string $animeSlug)
    {
        $sortInput = $request->query('sort');
        $allowedSorts = ['latest', 'most-loved', 'oldest'];
        $sortBy = in_array($sortInput, $allowedSorts) ? $sortInput : 'most-loved';

        $anime = $this->animeService->getAnimeInfo($animeSlug);

        $comments = $this->commentService->getComments('anime', $anime->id, 25, $sortBy);

        $paginatedComment = PaginatedCommentData::fromPaginator(
            $comments->through(fn (Comment $item): CommentData => CommentData::fromModel($item))
        );

        return Inertia::render('AnimeComment/Index', [
            'anime' => $anime,
            'paginatedComment' => $paginatedComment,
            'sortBy' => $sortBy,
        ]);
    }

    public function upvote(Request $request, int $commentId)
    {
        $this->commentService->toggleCommentUpvote($commentId, Auth::id());

        return back();
    }

    public function update(Request $request, int $commentId)
    {
        $validated = $request->validate(['body' => 'required|string']);

        $this->commentService->updateComment($commentId, Auth::id(), $validated);

        Inertia::flash('success', 'Comment updated');

        return back();
    }

    public function destroy(int $commentId)
    {
        $this->commentService->deleteComment($commentId, Auth::id());

        Inertia::flash('success', 'Comment deleted');

        return back();
    }
}
