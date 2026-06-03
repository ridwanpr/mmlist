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
 * @property int|null $anime_id
 * @property int $user_id
 * @property int|null $episode_number
 * @property string $body
 * @property int $upvotes
 * @property int $downvotes
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property int|null $parent_comment_id
 * @property-read \App\Models\Anime|null $anime
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
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Comment whereAnimeId($value)
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
        'anime_id',
        'body',
        'upvotes',
        'downvotes',
        'parent_comment_id',
    ];

    public function getBodyHtmlAttribute(): string
    {
        $body = $this->body;

        // Clean up spacing around Spoilers
        $body = preg_replace('/\s*\|\|\s+([^*]+?)\|\|/', ' ||$1||', $body);
        $body = preg_replace('/\|\|([^*]+?)\s+\|\|\s*/', '||$1|| ', $body);

        // Standard markdown compilation
        $html = \Illuminate\Support\Str::markdown($body, [
            'html_input' => 'strip',
            'allow_unsafe_links' => false,
        ]);

        // Apply your spoiler tag replacement
        $html = preg_replace(
            '/\|\|(.*?)\|\|/',
            '<span class="spoiler">$1</span>',
            $html
        );

        return $this->sanitizeBackendHtml($html);
    }

    private function sanitizeBackendHtml(string $html): string
    {
        if (empty(trim($html))) {
            return '';
        }

        $dom = new \DOMDocument();

        libxml_use_internal_errors(true);

        // Modern future-proof replacement for HTML-ENTITIES to handle UTF-8 properly
        $safeHtml = mb_encode_numericentity($html, [0x80, 0x10FFFF, 0, ~0], 'UTF-8');

        $dom->loadHTML(
            $safeHtml,
            LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD
        );
        libxml_clear_errors();

        // Define allowed tags based on your exact specifications
        $allowedTags = ['p', 'strong', 'em', 'span'];
        $elements = $dom->getElementsByTagName('*');

        // Iterate backwards to safely delete or rearrange elements dynamically
        for ($i = $elements->length - 1; $i >= 0; $i--) {
            $element = $elements->item($i);
            $tagName = strtolower($element->tagName);

            // If the tag isn't explicitly allowed, unwrap its contents safely
            if (!in_array($tagName, $allowedTags)) {
                while ($element->hasChildNodes()) {
                    $element->parentNode->insertBefore($element->firstChild, $element);
                }
                $element->parentNode->removeChild($element);
                continue;
            }

            // Clean up all attributes to block event handlers or malicious styles
            for ($j = $element->attributes->length - 1; $j >= 0; $j--) {
                $attr = $element->attributes->item($j);

                // Safety check to ensure the attribute node exists
                if (!$attr) {
                    continue;
                }

                $attrName = strtolower($attr->nodeName);

                // Keep only the class="spoiler" attribute declaration for your spans
                if ($tagName === 'span' && $attrName === 'class' && $element->getAttribute('class') === 'spoiler') {
                    continue;
                }

                $element->removeAttribute($attr->nodeName);
            }
        }

        return trim($dom->saveHTML());
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

    public function anime(): BelongsTo
    {
        return $this->belongsTo(Anime::class);
    }
}
