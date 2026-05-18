<?php
namespace App\DTOs;

readonly class WatchlistData
{
    public function __construct(
        public int $anime_id,
        public int $user_id,
        public string $status,
        public int $progress,
        public ?int $score,
        public ?string $note,
        public ?string $started_at = null,
        public ?string $completed_at = null,
        public ?string $created_at = null,
        public ?string $updated_at = null,
    ) {}

    public static function fromRequest(array $validated): self
    {
        return new self(
            anime_id: $validated['animeId'],
            user_id: $validated['userId'],
            status: $validated['status'],
            progress: $validated['progress'] ?? 0,
            score: $validated['score'] ?? null,
            note: $validated['note'] ?? null,
            started_at: $validated['started_at'] ?? null,
            updated_at: $validated['updated_at'] ?? null,
        );
    }
}
