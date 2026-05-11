<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable(['anime_id', 'studio_id'])]
class AnimeStudio extends Pivot
{
    protected $table = 'anime_studios';
    
    public $timestamps = true;

    public $incrementing = true;
}
