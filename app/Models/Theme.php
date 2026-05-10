<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperTheme
 */
#[Fillable(['mal_id', 'type', 'name', 'url'])]
class Theme extends Model
{
    //
}
