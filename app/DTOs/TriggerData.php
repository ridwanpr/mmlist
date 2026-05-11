<?php

namespace App\DTOs;

use App\Models\MasterTrigger;
use App\Models\TriggerContent;
use Carbon\CarbonInterface;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class TriggerData
{
    public function __construct(
        public string $name,
        public int $importance,
        public ?string $description,
        public ?CarbonInterface $created_at,
        public ?CarbonInterface $updated_at,
        /** @var TriggerContentData[] */
        public array $triggerContents,
    ) {}

    public static function fromModel(MasterTrigger $model): self
    {
        $triggerContents = $model->triggerContents
            ->map(fn(TriggerContent $trigger) => TriggerContentData::fromModel($trigger))
            ->values()
            ->all();

        return new self(
            name: $model->name,
            importance: $model->importance,
            description: $model->description,
            created_at: $model->created_at,
            updated_at: $model->updated_at,
            triggerContents: $triggerContents,
        );
    }
}
