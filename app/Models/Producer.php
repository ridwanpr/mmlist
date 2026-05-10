<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperProducer
 */
#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Producer extends Model
{
    //
}
