<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable(['anime_id', 'producer_id'])]
class AnimeProducer extends Pivot
{
    protected $table = 'anime_producers';

    public $timestamps = true;

    public $incrementing = true;
}
