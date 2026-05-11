<?php

namespace App\DTOs;

use App\Models\TriggerContent;
use Carbon\CarbonInterface;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class TriggerContentData
{
    public function __construct(
        public int $trigger_id,
        public string $name,
        public int $importance,
        public ?string $description,
        public ?CarbonInterface $created_at,
        public ?CarbonInterface $updated_at,
    ) {}

    public static function fromModel(TriggerContent $data): self
    {
        return new self(
            trigger_id: $data->trigger_id,
            name: $data->name,
            importance: $data->importance,
            description: $data->description,
            created_at: $data->created_at,
            updated_at: $data->updated_at,
        );
    }
}
