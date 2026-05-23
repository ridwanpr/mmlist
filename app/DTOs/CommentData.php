<?php

namespace App\DTOs;

use App\Models\Comment;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class CommentData
{
    public function __construct(
        public int $id,
        public int $animeId,
        public int $userId,
        public string $body,
        public int $upvotes,
        public int $downvotes,
        public string $createdAt,
        public string $updatedAt,
        public bool $isUpvoted,
        public ?UserData $user = null,
        public ?AnimeData $anime = null,
    ) {}

    public static function fromModel(Comment $model): self
    {
        return new self(
            id: $model->id,
            animeId: $model->anime_id,
            userId: $model->user_id,
            body: $model->body,
            upvotes: $model->upvotes,
            downvotes: $model->downvotes,
            createdAt: $model->created_at,
            updatedAt: $model->updated_at,
            isUpvoted: (bool) ($model->votes_exists ?? false),
            user: $model->relationLoaded('user') ? UserData::fromModel($model->user) : null,
            anime: $model->relationLoaded('anime') ? AnimeData::fromModel($model->anime) : null,
        );
    }
}
