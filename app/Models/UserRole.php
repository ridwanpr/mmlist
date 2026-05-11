<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Relations\Pivot;

#[Fillable(['user_id', 'role_id'])]
class UserRole extends Pivot
{
    public $timestamps = true;

    public $incrementing = true;
}
