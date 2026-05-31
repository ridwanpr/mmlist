<?php

namespace App\DTOs;

use App\Models\Contact;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class ContactData
{
    public function __construct(
        public int $id,
        public string $name,
        public string $content,
        public ?string $email,
        public string $createdAt,
        public string $updatedAt,
    ) {}

    public static function fromModel(Contact $model): self
    {
        return new self(
            id: $model->id,
            name: $model->name,
            content: $model->content,
            email: $model->email ?? null,
            createdAt: $model->created_at,
            updatedAt: $model->updated_at
        );
    }
}
