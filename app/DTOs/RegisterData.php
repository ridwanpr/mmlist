<?php

namespace App\DTOs;

use Illuminate\Http\Request;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class RegisterData
{
    public function __construct(
        public string $username,
        public string $name,
        public ?string $email,
        public string $password,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->username,
            $request->name,
            $request->email ?? null,
            $request->password,
        );
    }
}
