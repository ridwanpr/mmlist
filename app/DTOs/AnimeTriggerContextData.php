<?php

namespace App\DTOs;

use App\Models\AnimeTriggerContext;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class AnimeTriggerContextData
{
    public function __construct(
        public int $id,
        public int $anime_id,
        public int $trigger_content_id,
        public ?string $ai_summary,
        public ?string $created_at,
        public ?string $updated_at
    ) {}

    public static function fromModel(AnimeTriggerContext $model): self
    {
        return new self(
            id: $model->id,
            anime_id: $model->anime_id,
            trigger_content_id: $model->trigger_content_id,
            ai_summary: $model->ai_summary ?? null,
            created_at: $model->created_at ?? null,
            updated_at: $model->updated_at ?? null,
        );
    }
}
