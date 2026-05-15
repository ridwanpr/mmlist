<?php

namespace App\DTOs;

use App\Http\Requests\VoteAnimeTriggerRequest;
use App\Models\AnimeTrigger;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class AnimeTriggerData
{
    public function __construct(
        public int $trigger_content_id,
        public int $anime_id,
        public int $user_id,
        public bool $is_appear,
        public ?string $severity,
        public ?string $framing,
        public ?TriggerContentData $triggerContent = null,
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

    public static function fromModel(AnimeTrigger $model): self
    {
        return new self(
            trigger_content_id: $model->trigger_content_id,
            anime_id: $model->anime_id,
            user_id: $model->user_id,
            is_appear: (bool) $model->is_appear,
            severity: $model->severity,
            framing: $model->framing,
            triggerContent: $model->triggerContent ? TriggerContentData::fromModel($model->triggerContent) : null
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
