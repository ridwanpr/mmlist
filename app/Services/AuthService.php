<?php

namespace App\Services;

use App\DTOs\Auth\RegisterData;
use App\Repositories\UserRepository;
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
}
