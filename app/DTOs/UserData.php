<?php

namespace App\DTOs;

readonly class UserData
{
    public function __construct(
        public int $id,
        public string $name,
        public string $username,
        public ?string $email,
        public ?string $createdAt,
        public string $roleId,
    ) {}

    public static function fromDatabase(object $row): self
    {
        /** @var array<string, mixed> $data */
        $data = (array) $row;

        return new self(
            id: (int) ($data['id']),
            name: (string) ($data['name']),
            username: (string) ($data['username']),
            email: (string) ($data['email'] ?? null),
            createdAt: isset($data['created_at']) && is_string($data['created_at'])
                ? $data['created_at']
                : null,
            roleId: (string) ($data['role_id'])
        );
    }
}
