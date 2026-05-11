<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable(['anime_id', 'demographic_id'])]
class AnimeDemographic extends Pivot
{
    protected $table = 'anime_demographics';

    public $timestamps = true;

    public $incrementing = true;
}
