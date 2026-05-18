<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

/**
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Watchlist query()
 *
 * @mixin \Eloquent
 */
#[Fillable(['user_id', 'anime_id', 'status', 'progress', 'score', 'note', 'started_at', 'completed_at'])]
class Watchlist extends Pivot
{
    protected $table = 'watchlists';
}
