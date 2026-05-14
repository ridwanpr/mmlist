<?php

namespace App\DTOs;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class TriggerStatsData
{
    public function __construct(
        public int $appear_true,
        public int $appear_false,
        /** @var array{Mild: int, Moderate: int, Severe: int, Extreme: int} */
        public array $severity,
        /** @var array{Serious: int, Neutral: int, Romanticized: int, Comedic: int} */
        public array $framing,
    ) {}
}
