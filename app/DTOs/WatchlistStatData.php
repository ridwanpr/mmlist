<?php

namespace App\DTOs;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class WatchlistStatData
{
    public function __construct(
        public int $planned,
        public int $watching,
        public int $completed,
        public int $on_hold,
        public int $dropped,
    ) {}

    /**
     * @param  array<string, int>  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            planned: $data['planned'] ?? 0,
            watching: $data['watching'] ?? 0,
            completed: $data['completed'] ?? 0,
            on_hold: $data['on_hold'] ?? 0,
            dropped: $data['dropped'] ?? 0,
        );
    }
}
