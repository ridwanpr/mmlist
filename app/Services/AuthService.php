<?php

namespace App\Services;

use App\DTOs\LoginData;
use App\DTOs\RegisterData;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthService
{
    public function createNewUser(RegisterData $data): void
    {
        DB::transaction(function () use ($data) {
            $user = User::create([
                'name' => $data->name,
                'username' => $data->username,
                'email' => $data->email,
                'password' => $data->password,
            ]);

            $user->roles()->attach('user');
        });
    }

    public function authenticate(LoginData $data): bool
    {
        return Auth::attempt([
            'username' => $data->username,
            'password' => $data->password,
        ]);
    }

    public function getAuthenticatedUserRole(): ?string
    {
        return DB::table('user_roles')
            ->where('user_id', Auth::id())
            ->value('role_id');
    }

    public function logout(): void
    {
        Auth::logout();
    }
}
