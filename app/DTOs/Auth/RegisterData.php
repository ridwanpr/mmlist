<?php

namespace App\DTOs\Auth;

use App\Http\Requests\RegisterRequest;

readonly class RegisterData
{
    public function __construct(
        public string $username,
        public string $name,
        public string $email,
        public string $password,
    ) {}

    public static function fromRequest(RegisterRequest $request): self
    {
        return new self(
            $request->validated('username'),
            $request->validated('name'),
            $request->validated('email'),
            $request->validated('password'),
        );
    }
}
