<?php

namespace App\DTOs;

use App\Http\Requests\StoreWatchlistRequest;
use App\Models\Watchlist;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class WatchlistData
{
    /** @param  array<string, mixed> $images */
    public function __construct(
        public ?int $id,
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
        public ?string $title = null,
        public ?string $year = null,
        public ?string $type = null,
        public ?string $episodes = null,
        public ?array $images = null,
        public ?string $slug = null
    ) {}

    public static function fromRequest(StoreWatchlistRequest $request): self
    {
        $validated = $request->validated();

        return new self(
            id: null,
            anime_id: $validated['animeId'],
            user_id: $validated['userId'],
            status: $validated['status'],
            progress: $validated['progress'] ?? 0,
            score: $validated['score'] ?? null,
            note: $validated['note'] ?? null,
            started_at: $validated['started_at'] ?? null,
            completed_at: $validated['completed_at'] ?? null,
        );
    }

    public static function fromModel(Watchlist $model): self
    {
        return new self(
            id: $model->id,
            anime_id: $model->anime_id,
            user_id: $model->user_id,
            status: $model->status,
            progress: $model->progress,
            score: $model->score,
            note: $model->note,
            started_at: $model->started_at,
            completed_at: $model->completed_at,
            created_at: $model->created_at,
            updated_at: $model->updated_at,
            title: $model->title,
            type: $model->type,
            year: $model->year,
            episodes: $model->episodes,
            images: json_decode($model->images, true),
            slug: $model->slug,
        );
    }
}
