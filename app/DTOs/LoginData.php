<?php

namespace App\DTOs;

use Illuminate\Http\Request;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class LoginData
{
    public function __construct(
        public string $username,
        public string $password,
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->username,
            $request->password,
        );
    }
}
