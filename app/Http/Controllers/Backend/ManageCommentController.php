<?php

namespace App\Http\Controllers\Backend;

use App\DTOs\CommentData;
use App\DTOs\PaginatedCommentData;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Services\CommentService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class ManageCommentController extends Controller
{
    public function __construct(private CommentService $commentService) {}

    public function index(): Response
    {
        $comments = $this->commentService->getLatestCommentPaginate(20);

        $paginatedComments = PaginatedCommentData::fromPaginator(
            $comments->through(fn(Comment $item): CommentData => CommentData::fromModel($item))
        );

        return Inertia::render("Backend/Comment/Index", [
            'paginatedComments' => $paginatedComments
        ]);
    }

    public function destroy(int $id): RedirectResponse
    {
        Comment::findorFail($id)->delete();

        return redirect()->back();
    }
}
