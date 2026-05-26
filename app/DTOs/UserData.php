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
        public ?string $birth_date,
        public ?bool $is_banned,
        public ?bool $show_nsfw,
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
            birth_date: $model->birth_date ?? null,
            is_banned: $model->is_banned ?? null,
            show_nsfw: $model->show_nsfw ?? null,
        );
    }
}
