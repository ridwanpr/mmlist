<?php

namespace App\DTOs;

use App\Http\Requests\VoteAnimeTriggerRequest;

readonly class AnimeTriggerData
{
    public function __construct(
        public int $trigger_content_id,
        public int $anime_id,
        public int $user_id,
        public bool $is_appear,
        public ?string $severity,
        public ?string $framing,
    ) {}

    public static function fromRequest(
        VoteAnimeTriggerRequest $request,
        int $animeId,
        int $userId,
        int $triggerContentId
    ): self {
        $validated = $request->validated();

        return new self(
            trigger_content_id: $triggerContentId,
            anime_id: $animeId,
            user_id: $userId,
            is_appear: $request->boolean('appears'),
            severity: $validated['severity'] ?? null,
            framing: $validated['framing'] ?? null
        );
    }

    public function toArray(): array
    {
        return [
            'trigger_content_id' => $this->trigger_content_id,
            'anime_id' => $this->anime_id,
            'user_id' => $this->user_id,
            'is_appear' => $this->is_appear,
            'severity' => $this->severity,
            'framing' => $this->framing,
        ];
    }
}
