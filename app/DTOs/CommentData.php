<?php

namespace App\DTOs;

use App\Models\Comment;
use App\Models\Anime;
use App\Models\TriggerContent;
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
        public int $animeId,
        public ?int $parentCommentId = null,
        public ?UserData $user = null,
        public ?CommentData $parent = null,
        public AnimeData|TriggerContentData|null $commentable = null,
        public ?AnimeData $anime = null,
    ) {}

    public static function fromModel(Comment $model): self
    {
        $commentable = null;
        if ($model->relationLoaded('commentable') && $model->commentable) {
            $commentable = match (true) {
                $model->commentable instanceof Anime => AnimeData::fromModel($model->commentable),
                $model->commentable instanceof TriggerContent => TriggerContentData::fromModel($model->commentable),
                default => null,
            };
        }

        return new self(
            id: $model->id,
            commentableType: $model->commentable_type,
            commentableId: $model->commentable_id,
            userId: $model->user_id,
            animeId: $model->anime_id,
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
            commentable: $commentable,
            anime: $model->relationLoaded('anime') && $model->anime ?
                AnimeData::fromModel($model->anime) : null,
        );
    }
}
