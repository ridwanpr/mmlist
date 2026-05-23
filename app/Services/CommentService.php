<?php

namespace App\Services;

use App\DTOs\CommentData;
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

    public function getAnimeComments(int $animeId, int $paginateLimit = 15)
    {
        $commentData = Comment::where('anime_id', $animeId)
            ->with(['user'])
            ->latest()
            ->paginate($paginateLimit);

        return $commentData;
    }
}
