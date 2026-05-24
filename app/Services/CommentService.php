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
    public function storeComment(int $userId, int $animeId, array $data, int|null $parent_comment_id = null): Comment
    {
        return Comment::create([
            'user_id' => $userId,
            'anime_id' => $animeId,
            'body' => $data['body'],
            'parent_comment_id' => $parent_comment_id ?? null
        ]);
    }

    public function getTopAnimeComments(int $animeId)
    {
        $commentData = Comment::where('anime_id', $animeId)
            ->with(['user'])
            ->limit(4)
            ->orderBy('upvotes', 'desc')
            ->get();

        return $commentData;
    }

    public function getAnimeComments(int $animeId, int $paginateLimit = 25, string $sortBy = "latest")
    {
        $commentData = Comment::where('anime_id', $animeId)
            ->with(['user', 'parent', 'parent.user'])
            ->withExists(['votes' => function ($q) {
                $q->where('user_id', Auth::id());
            }])
            ->when($sortBy === "latest", function ($q) {
                return $q->latest();
            })->when($sortBy === "most-loved", function ($q) {
                return $q->orderBy('upvotes', 'desc');
            })->when($sortBy === "oldest", function ($q) {
                return $q->orderBy("created_at", 'asc');
            })
            ->paginate($paginateLimit)
            ->onEachSide(1)
            ->withQueryString();

        return $commentData;
    }

    public function getCommentCount(int $animeId)
    {
        return Comment::where('anime_id', $animeId)->count();
    }

    public function findCommentFirst(int $commentId)
    {
        return Comment::where('id', $commentId)->firstOrFail();
    }

    public function toggleCommentUpvote(int $commentId, int $userId)
    {

        try {
            DB::beginTransaction();
            $comment = $this->findCommentFirst($commentId);
            $existingVote = CommentVote::where('comment_id', $comment->id)
                ->where('user_id', $userId)->first();

            if ($existingVote) {
                $existingVote->delete();
                $comment->decrement('upvotes');
            } else {
                CommentVote::create([
                    'user_id' => $userId,
                    'comment_id' => $commentId,
                    'type' => 'upvote'
                ]);
                $comment->increment('upvotes');
            }

            DB::commit();
        } catch (Exception $e) {
            dd($e);
            Log::error($e);
            throw $e;
        }
    }
}
