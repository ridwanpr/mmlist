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
        public ?TriggerStatsData $stats = null,
    ) {}

    public static function fromModel(TriggerContent $data): self
    {
        $animeTriggers = [];

        $appearTrue = 0;
        $appearFalse = 0;
        $severityCounts = ['Mild' => 0, 'Moderate' => 0, 'Severe' => 0, 'Extreme' => 0];
        $framingCounts = ['Serious' => 0, 'Neutral' => 0, 'Romanticized' => 0, 'Comedic' => 0];

        if ($data->relationLoaded('animeTriggers')) {
            foreach ($data->animeTriggers as $animeTrigger) {
                $animeTriggers[] = AnimeTriggerData::fromModel($animeTrigger);

                if ($animeTrigger->is_appear) {
                    $appearTrue++;
                } else {
                    $appearFalse++;
                }

                if ($animeTrigger->severity) {
                    $severityCounts[$animeTrigger->severity]++;
                }

                if ($animeTrigger->framing) {
                    $framingCounts[$animeTrigger->framing]++;
                }
            }
        }

        $stats = new TriggerStatsData(
            appear_true: $appearTrue,
            appear_false: $appearFalse,
            severity: $severityCounts,
            framing: $framingCounts
        );

        return new self(
            id: $data->id,
            trigger_id: $data->trigger_id,
            name: $data->name,
            importance: $data->importance,
            description: $data->description,
            created_at: $data->created_at,
            updated_at: $data->updated_at,
            animeTriggers: $animeTriggers,
            stats: $stats,
        );
    }
}
