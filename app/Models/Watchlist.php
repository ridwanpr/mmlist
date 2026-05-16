<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['user_id', 'anime_id', 'status', 'progress', 'score', 'note', 'started_at', 'completed_at'])]
class Watchlist extends Model
{
    //
}
