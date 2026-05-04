<?php

namespace App\Repositories;

use App\DTOs\Auth\RegisterData;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserRepository
{
    public function create(RegisterData $data): int
    {
        return DB::table('users')->insertGetId([
            'name' => $data->name,
            'username' => $data->username,
            'email' => $data->email,
            'password' => Hash::make($data->password),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }

    public function assignRole(int $userId, string $roleId = 'user'): bool
    {
        return DB::table('user_roles')->insert([
            'user_id' => $userId,
            'role_id' => $roleId,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
