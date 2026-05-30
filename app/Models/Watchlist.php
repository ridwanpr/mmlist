<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $anime_id
 * @property int $user_id
 * @property string $status
 * @property int $progress
 * @property int|null $score
 * @property string|null $note
 * @property string|null $started_at
 * @property string|null $completed_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereAnimeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereNote($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereScore($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereStartedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist whereUserId($value)
 * @mixin \Eloquent
 */
#[Fillable(['user_id', 'anime_id', 'status', 'progress', 'score', 'note', 'started_at', 'completed_at'])]
class Watchlist extends Pivot
{
    protected $table = 'watchlists';

    
}
