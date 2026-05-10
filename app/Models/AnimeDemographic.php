<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperAnimeDemographic
 */
#[Fillable(['anime_id', 'demographic_id'])]
class AnimeDemographic extends Model
{
    //
}
