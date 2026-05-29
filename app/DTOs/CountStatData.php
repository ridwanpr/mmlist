<?php

namespace App\DTOs;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class CountStatData
{
    public function __construct(
        public int $totalAnime,
        public int $episodesWatched,
        public int $currentlyWatching,
        public int $completionRate,
        public int $dropRate,
        public float $averageScore,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            totalAnime: (int) ($data['total'] ?? 0),
            episodesWatched: (int) ($data['total_progress'] ?? 0),
            currentlyWatching: (int) ($data['watching'] ?? 0),
            completionRate: (int) ($data['completion_rate'] ?? 0),
            dropRate: (int) ($data['drop_rate'] ?? 0),
            averageScore: (float) ($data['avg_score'] ?? 0.0),
        );
    }
}
