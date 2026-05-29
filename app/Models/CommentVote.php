<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $user_id
 * @property int $comment_id
 * @property string $type
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property-read \App\Models\Comment $comment
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommentVote newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommentVote newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommentVote query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommentVote whereCommentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommentVote whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommentVote whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommentVote whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommentVote whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|CommentVote whereUserId($value)
 * @mixin \Eloquent
 */
class CommentVote extends Model
{
    protected $table = 'comment_votes';

    protected $fillable = [
        'user_id',
        'comment_id',
        'type',
    ];

    public function comment(): BelongsTo
    {
        return $this->belongsTo(Comment::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
