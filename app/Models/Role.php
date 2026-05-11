<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Table;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

#[Fillable(['name', 'description'])]
#[Table(key: 'id', keyType: 'string', incrementing: false)]
class Role extends Model
{
    /**
     * @return BelongsToMany<User, $this, UserRole>
     */
    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'user_roles', 'role_id', 'user_id')
            ->using(UserRole::class)
            ->withTimestamps();
    }
}
