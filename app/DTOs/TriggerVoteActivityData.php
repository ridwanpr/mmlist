<?php

namespace App\DTOs;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class TriggerVoteActivityData
{
    /**
     * @param array<int, array{date: string, count: int}> $days
     */
    public function __construct(
        public array $days
    ) {}

    /**
     * @param array<int, array{date: string, count: int}> $days
     */
    public static function fromArray(array $days): self
    {
        return new self($days);
    }
}
