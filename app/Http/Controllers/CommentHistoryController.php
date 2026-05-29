<?php

namespace App\Http\Controllers;

use App\DTOs\CommentData;
use App\DTOs\PaginatedCommentData;
use App\Models\Comment;
use App\Services\CommentService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CommentHistoryController extends Controller
{
    public function __construct(private CommentService $commentService) {}

    public function index()
    {
        $user = Auth::user();

        $commentFromDb = $this->commentService->getUserCommentHistory($user->id, 15);
        $commentsHistory = $commentFromDb->through(fn (Comment $item) => CommentData::fromModel($item));
        $paginatedComments = PaginatedCommentData::fromPaginator($commentsHistory);

        return Inertia::render('CommentHistory/Index', [
            'paginatedComments' => $paginatedComments,
        ]);
    }
}
