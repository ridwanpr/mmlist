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

    public static function fromModel(Theme $theme)
    {
        return new self(
            id: $theme->id,
            mal_id: $theme->mal_id,
            type: $theme->type,
            name: $theme->name,
            url: $theme->url,
        );
    }
}
