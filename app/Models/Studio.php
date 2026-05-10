<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperStudio
 */
#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Studio extends Model
{
    //
}
