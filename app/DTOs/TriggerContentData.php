<?php

namespace App\DTOs;

use App\Models\TriggerContent;
use Carbon\CarbonInterface;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class TriggerContentData
{
    public function __construct(
        public int $id,
        public int $trigger_id,
        public string $name,
        public int $importance,
        public ?string $description,
        public ?CarbonInterface $created_at,
        public ?CarbonInterface $updated_at,
        /** @var AnimeTriggerData[] */
        public array $animeTriggers = [],
    ) {}

    public static function fromModel(TriggerContent $data): self
    {
        $animeTriggers = [];

        if ($data->relationLoaded('animeTriggers')) {
            $animeTriggers = $data->animeTriggers
                ->map(fn($animeTrigger) => AnimeTriggerData::fromModel($animeTrigger))
                ->values()
                ->all();
        }

        return new self(
            id: $data->id,
            trigger_id: $data->trigger_id,
            name: $data->name,
            importance: $data->importance,
            description: $data->description,
            created_at: $data->created_at,
            updated_at: $data->updated_at,
            animeTriggers: $animeTriggers,
        );
    }
}
