<?php

namespace App\Services;

use App\Models\Comment;

class CommentService
{
    public function storeComment(int $userId, int $animeId, array $data): Comment
    {
        return Comment::create([
            'user_id' => $userId,
            'anime_id' => $animeId,
            'body' => $data['body']
        ]);
    }

    public function getTopAnimeComments(int $animeId)
    {
        $commentData = Comment::where('anime_id', $animeId)
            ->with(['user'])
            ->limit(5)
            ->orderBy('upvotes', 'desc')
            ->get();

        return $commentData;
    }

    public function getAnimeComments(int $animeId, int $paginateLimit = 25, string $sortBy = "latest")
    {
        $commentData = Comment::where('anime_id', $animeId)
            ->with(['user'])
            ->when($sortBy === "latest", function ($q) {
                return $q->latest();
            })->when($sortBy === "most_loved", function ($q) {
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
}
