<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperGenre
 */
#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Genre extends Model
{
    //
}
