<?php

namespace App\DTOs;

use App\Models\Comment;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class CommentData
{
    public function __construct(
        public int $id,
        public string $commentableType,
        public int $commentableId,
        public int $userId,
        public string $body,
        public string $bodyHtml,
        public int $upvotes,
        public int $downvotes,
        public string $createdAt,
        public string $updatedAt,
        public bool $isUpvoted,
        public ?int $parentCommentId = null,
        public ?UserData $user = null,
        public ?CommentData $parent = null,
    ) {}

    public static function fromModel(Comment $model): self
    {
        return new self(
            id: $model->id,
            commentableType: $model->commentable_type,
            commentableId: $model->commentable_id,
            userId: $model->user_id,
            body: $model->body,
            bodyHtml: $model->body_html,
            upvotes: $model->upvotes,
            downvotes: $model->downvotes,
            createdAt: $model->created_at?->toDateTimeString() ?? '',
            updatedAt: $model->updated_at?->toDateTimeString() ?? '',
            isUpvoted: (bool) ($model->votes_exists ?? false),
            parentCommentId: $model->parent_comment_id,
            user: $model->relationLoaded('user') && $model->user
                ? UserData::fromModel($model->user)
                : null,
            parent: $model->relationLoaded('parent') && $model->parent
                ? CommentData::fromModel($model->parent)
                : null,
        );
    }
}
