<?php

namespace App\DTOs;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class TriggerFramingStatData
{
    public function __construct(
        public int $serious,
        public int $neutral,
        public int $romanticized,
        public int $comedic,
    ) {}

    /**
     * @param  array<string, int>  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            serious: $data['Serious'] ?? 0,
            neutral: $data['Neutral'] ?? 0,
            romanticized: $data['Romanticized'] ?? 0,
            comedic: $data['Comedic'] ?? 0,
        );
    }
}
