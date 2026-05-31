<?php

namespace App\Http\Controllers;

use App\DTOs\CommentData;
use App\DTOs\PaginatedCommentData;
use App\Models\Comment;
use App\Services\CommentService;
use App\Services\VoteService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CommunityController extends Controller
{
    public function __construct(
        private CommentService $commentService,
    ) {}

    public function index()
    {
        $comments = $this->commentService->getLatestCommentPaginate(15);

        $paginatedComments = PaginatedCommentData::fromPaginator(
            $comments->through(fn(Comment $item): CommentData => CommentData::fromModel($item))
        );

        return Inertia::render('Community/Index', [
            'paginatedComments' => $paginatedComments
        ]);
    }
}
