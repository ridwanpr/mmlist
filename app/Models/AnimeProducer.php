<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperAnimeProducer
 */
#[Fillable(['anime_id', 'producer_id'])]
class AnimeProducer extends Model
{
    //
}
