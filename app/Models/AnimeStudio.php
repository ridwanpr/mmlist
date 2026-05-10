<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperAnimeStudio
 */
#[Fillable(['anime_id', 'studio_id'])]
class AnimeStudio extends Model
{
    //
}
