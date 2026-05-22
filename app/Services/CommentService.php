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
}
