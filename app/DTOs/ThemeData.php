<?php

namespace App\DTOs;

use App\Models\Theme;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class ThemeData
{
    public function __construct(
        public int $id,
        public int $mal_id,
        public string $type,
        public string $name,
        public string $url
    ) {}

    public static function fromModel(Theme $theme): self
    {
        return new self(
            id: $theme->id,
            mal_id: $theme->mal_id,
            type: $theme->type,
            name: $theme->name,
            url: $theme->url,
        );
    }

    /** @param array<string, string|int> $data */
    public static function fromArray(array $data): self
    {
        return new self(
            id: (int) $data['id'],
            mal_id: (int) $data['mal_id'],
            type: (string) $data['type'],
            name: (string) $data['name'],
            url: (string) $data['url'],
        );
    }
}
