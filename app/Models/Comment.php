<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphTo;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property string $commentable_type
 * @property int $commentable_id
 * @property int $user_id
 * @property int|null $episode_number
 * @property string $body
 * @property int $upvotes
 * @property int $downvotes
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int|null $parent_comment_id
 * @property-read Model|\Eloquent $commentable
 * @property-read string $body_html
 * @property-read Comment|null $parent
 * @property-read Collection<int, Comment> $replies
 * @property-read int|null $replies_count
 * @property-read \App\Models\User $user
 * @property-read Collection<int, \App\Models\CommentVote> $votes
 * @property-read int|null $votes_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereCommentableId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereCommentableType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereDownvotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereEpisodeNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereParentCommentId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereUpvotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereUserId($value)
 * @mixin \Eloquent
 */
class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'commentable_type',
        'commentable_id',
        'body',
        'upvotes',
        'downvotes',
        'parent_comment_id',
    ];

    public function getBodyHtmlAttribute(): string
    {
        $body = $this->body;

        // Clean up Double Asterisks (**bold**)
        $body = preg_replace('/\s*\*\*\s+([^*]+?)\*\*/', ' **$1**', $body);
        $body = preg_replace('/\*\*([^*]+?)\s+\*\*\s*/', '**$1** ', $body);

        // Clean up Single Asterisks (*italics*)
        $body = preg_replace('/\s*(?<!\*)\*\s+([^*]+?)\*(?!\*)/', ' *$1*', $body);
        $body = preg_replace('/(?<!\*)\*([^*]+?)\s+\*(?!\*)\s*/', '*$1* ', $body);

        // Clean up Spoilers (||spoiler||)
        $body = preg_replace('/\s*\|\|\s+([^|]+?)\|\|/', ' ||$1||', $body);
        $body = preg_replace('/\|\|([^|]+?)\s+\|\|\s*/', '||$1|| ', $body);

        $html = Str::markdown($body, [
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);

        return preg_replace(
            '/\|\|(.*?)\|\|/',
            '<span class="spoiler">$1</span>',
            $html
        );
    }

    public function commentable(): MorphTo
    {
        return $this->morphTo();
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(CommentVote::class);
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(Comment::class, 'parent_comment_id');
    }

    public function replies(): HasMany
    {
        return $this->hasMany(Comment::class, 'parent_comment_id');
    }
}
