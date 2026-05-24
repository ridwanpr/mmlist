<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Str;

/**
 * @property int $id
 * @property int $user_id
 * @property int $anime_id
 * @property int|null $episode_number
 * @property string $body
 * @property int $upvotes
 * @property int $downvotes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Anime $anime
 * @property-read \App\Models\User $user
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereBody($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereDownvotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereEpisodeNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereUpvotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereUserId($value)
 * @mixin \Eloquent
 */
class Comment extends Model
{
    protected $fillable = [
        'user_id',
        'anime_id',
        'episode_number',
        'body',
        'upvotes',
        'downvotes',
    ];

    public function getBodyHtmlAttribute(): string
    {
        $body = $this->body;

        // Shift trapped trailing spaces inside formatting tags to the outside
        $body = preg_replace('/_*\s*([^*]+?)\s+(\*\*)(\s?)/', '**$1** ', $body);
        $body = preg_replace('/(?<!\*)\*([^*]+?)\s+\*(?!\*)(\s?)/', '*$1* ', $body);
        $body = preg_replace('/\|\|([^|]+?)\s+\|\|(\s?)/', '||$1|| ', $body);

        // Shift trapped leading spaces inside formatting tags to the outside
        $body = preg_replace('/(\s?)\*\*\s+([^*]+?)\*\*/', ' **$2**', $body);
        $body = preg_replace('/(\s?)(?<!\*)\*\s+([^*]+?)\*(?!\*)/', ' *$2*', $body);
        $body = preg_replace('/(\s?)\|\|\s+([^|]+?)\|\|/', ' ||$2||', $body);

        // Run the cleaned markdown text through the secure compiler
        $html = Str::markdown(
            $body,
            [
                'html_input' => 'strip',
                'allow_unsafe_links' => false,
            ]
        );

        return preg_replace(
            '/\|\|(.*?)\|\|/',
            '<span class="spoiler">$1</span>',
            $html
        );
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function anime(): BelongsTo
    {
        return $this->belongsTo(Anime::class);
    }

    public function votes(): HasMany
    {
        return $this->hasMany(CommentVote::class);
    }
}
