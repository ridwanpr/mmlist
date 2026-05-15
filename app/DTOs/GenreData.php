<?php

namespace App\DTOs;

use App\Models\Genre;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class GenreData
{
    public function __construct(
        public int $id,
        public int $mal_id,
        public string $type,
        public string $name,
        public string $url
    ) {}

    public static function fromModel(Genre $genre)
    {
        return new self(
            id: $genre->id,
            mal_id: $genre->mal_id,
            type: $genre->type,
            name: $genre->name,
            url: $genre->url,
        );
    }
}
