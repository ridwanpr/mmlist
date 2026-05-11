<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable(['anime_id', 'theme_id'])]
class AnimeTheme extends Pivot
{
    public $timestamps = true;

    public $incrementing = true;
}
