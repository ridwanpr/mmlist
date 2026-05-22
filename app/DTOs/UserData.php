<?php

namespace App\DTOs;

use App\Models\User;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class UserData
{
    public function __construct(
        public int $id,
        public string $name,
        public string $username,
        public ?string $email,
        public ?string $createdAt,
        public ?string $updatedAt,
    ) {}

    public static function fromModel(User $model): self
    {
        return new self(
            id: $model->id,
            name: $model->name,
            username: $model->username,
            email: $model->email ?? null,
            createdAt: $model->created_at ?? null,
            updatedAt: $model->updated_at ?? null,
        );
    }
}
