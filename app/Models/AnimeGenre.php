<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable(['anime_id', 'genre_id'])]
class AnimeGenre extends Pivot
{
    public $timestamps = true;

    public $incrementing = true;
}
