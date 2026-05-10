<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

/**
 * @mixin IdeHelperAnimeTheme
 */
#[Fillable(['anime_id', 'theme_id'])]
class AnimeTheme extends Model
{
    //
}
