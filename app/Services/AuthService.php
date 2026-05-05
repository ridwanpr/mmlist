<?php

namespace App\Services;

use App\DTOs\LoginData;
use App\DTOs\RegisterData;
use App\Repositories\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthService
{
    public function __construct(private UserRepository $userRepository) {}

    public function createNewUser(RegisterData $data): void
    {
        DB::transaction(function () use ($data) {
            $userId = $this->userRepository->create($data);
            $this->userRepository->assignRole($userId, 'user');
        });
    }

    public function authenticate(LoginData $data): bool
    {
        $credentials = [
            'username' => $data->username,
            'password' => $data->password,
        ];

        return Auth::attempt($credentials);
    }

    public function logout(): void
    {
        Auth::logout();
    }
}
