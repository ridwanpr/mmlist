<?php

namespace App\Repositories;

use App\DTOs\RegisterData;
use App\DTOs\UserData;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
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

    /**
     * @return LengthAwarePaginator<int, UserData>
     */
    public function getAll(int $itemPerPage = 10): LengthAwarePaginator
    {
        $paginator = DB::table('users')
            ->join('user_roles', 'user_roles.user_id', 'users.id')
            ->select(
                'users.id',
                'users.name',
                'users.username',
                'users.email',
                'users.created_at',
                'user_roles.role_id'
            )
            ->paginate($itemPerPage);

        $paginator->through(function ($row) {
            return UserData::fromDatabase($row);
        });

        return $paginator;
    }
}
