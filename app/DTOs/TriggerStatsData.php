<?php

namespace App\DTOs;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class TriggerStatsData
{
    public function __construct(
        public int $appear_true,
        public int $appear_false,
        public array $severity,
        public array $framing,
    ) {}
}
