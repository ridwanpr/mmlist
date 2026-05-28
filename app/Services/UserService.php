<?php

namespace App\Services;

use App\DTOs\PaginatedUserData;
use App\DTOs\UserData;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserService
{
    public function updateUser(int $userId, array $data): bool
    {
        // Handle Checkbox, If 'show_nsfw' isn't sent in the request payload, set it to false
        $data['show_nsfw'] = isset($data['show_nsfw']) && ($data['show_nsfw'] === 'on' || $data['show_nsfw'] == true);

        //  Hash it if password provided otherwise, strip it from the array to preserve current password
        if (!empty($data['password'])) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        // Clean up confirmation fields and temporary validation fields
        unset($data['password_confirmation'], $data['current_password']);

        return User::where('id', $userId)->update($data);
    }

    public function findUserByUsername(string $username)
    {
        return User::where('username', $username)->firstOrFail();
    }

    public function getUserPaginate(int $paginateLimit = 15)
    {
        $users = User::with('roles')
            ->whereHas('roles', function ($query) {
                $query->where('role_id', 'user');
            })
            ->latest()
            ->paginate($paginateLimit)
            ->onEachSide(1)
            ->withQueryString();

        $userDto = $users->through(fn(User $item) => UserData::fromModel($item));

        return PaginatedUserData::fromPaginator($userDto);
    }

    public function findUserById(int $id)
    {
        return User::where('id', $id)->firstOrFail();
    }
}
