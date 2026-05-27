<?php

namespace App\Services;

use App\Models\Comment;
use App\Models\CommentVote;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CommentService
{
    public function storeComment(
        int $userId,
        string $commentableType,
        int $commentableId,
        array $data,
        ?int $parentCommentId = null
    ): Comment {
        return Comment::create([
            'user_id' => $userId,
            'commentable_type' => $commentableType,
            'commentable_id' => $commentableId,
            'anime_id' => $data['anime_id'],
            'body' => $data['body'],
            'parent_comment_id' => $parentCommentId,
        ]);
    }

    public function getComments(
        string $commentableType,
        int $commentableId,
        int $paginateLimit = 25,
        string $sortBy = 'latest'
    ) {
        return Comment::where('commentable_type', $commentableType)
            ->where('commentable_id', $commentableId)
            ->with(['user', 'parent', 'parent.user'])
            ->withExists(['votes' => fn($q) => $q->where('user_id', Auth::id())])
            ->when($sortBy === 'latest', fn($q) => $q->latest())
            ->when($sortBy === 'most-loved', fn($q) => $q->orderBy('upvotes', 'desc'))
            ->when($sortBy === 'oldest', fn($q) => $q->orderBy('created_at', 'asc'))
            ->paginate($paginateLimit)
            ->onEachSide(1)
            ->withQueryString();
    }

    public function getTopComments(
        string $commentableType,
        int $commentableId,
        int $limit = 4
    ) {
        return Comment::where('commentable_type', $commentableType)
            ->where('commentable_id', $commentableId)
            ->with(['user'])
            ->orderBy('upvotes', 'desc')
            ->limit($limit)
            ->get();
    }

    public function getLatestCommentLimit(int $limit = 10)
    {
        $comments = Comment::with(['user', 'commentable', 'anime'])
            ->limit($limit)->orderBy('created_at', 'desc')->get();

        return $comments;
    }

    public function getCommentCount(
        string $commentableType,
        int $commentableId
    ): int {
        return Comment::where('commentable_type', $commentableType)
            ->where('commentable_id', $commentableId)
            ->count();
    }

    public function findCommentFirst(int $commentId): Comment
    {
        return Comment::where('id', $commentId)->firstOrFail();
    }

    public function toggleCommentUpvote(
        int $commentId,
        int $userId
    ): void {
        try {
            DB::beginTransaction();

            $comment = $this->findCommentFirst($commentId);
            $existingVote = CommentVote::where('comment_id', $comment->id)
                ->where('user_id', $userId)
                ->first();

            if ($existingVote) {
                $existingVote->delete();
                $comment->decrement('upvotes');
            } else {
                CommentVote::create([
                    'user_id' => $userId,
                    'comment_id' => $commentId,
                    'type' => 'upvote',
                ]);
                $comment->increment('upvotes');
            }

            DB::commit();
        } catch (Exception $e) {
            DB::rollBack();
            Log::error($e);
            throw $e;
        }
    }

    public function updateComment(
        int $commentId,
        int $userId,
        array $data
    ): int {
        return Comment::where('id', $commentId)
            ->where('user_id', $userId)
            ->update(['body' => $data['body']]);
    }

    public function deleteComment(int $commentId, int $userId): bool
    {
        return Comment::where('id', $commentId)
            ->where('user_id', $userId)
            ->delete();
    }

    public function getTriggerCommentsCount(int $animeId)
    {
        return Comment::where('anime_id', $animeId)
            ->where('commentable_type', 'trigger_content')
            ->groupBy('commentable_id')
            ->selectRaw('commentable_id, count(*) as total')
            ->pluck('total', 'commentable_id')
            ->all();
    }

    public function getUserCommentHistory(int $userId, int $paginateLimit = 15)
    {
        return Comment::with(['user', 'anime', 'commentable', 'parent'])
            ->where('user_id', $userId)
            ->paginate($paginateLimit);
    }
}
