<?php

namespace App\DTOs;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class AnimeMetaData
{
    public function __construct(
        public int $malId,
        public string $type,
        public string $name,
        public string $url,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            malId: $data['mal_id'],
            type: $data['type'],
            name: $data['name'],
            url: $data['url'],
        );
    }
}
