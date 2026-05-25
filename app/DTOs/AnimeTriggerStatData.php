<?php

namespace App\DTOs;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class AnimeTriggerStatData
{
    public function __construct(
        public int $totalReports,
        public int $appearYesCount,
        public int $appearNoCount,
        public int $severityMild,
        public int $severityModerate,
        public int $severitySevere,
        public int $framingSerious,
        public int $framingNeutral,
        public int $framingRomanticized,
        public int $framingComedic,
    ) {}

    /**
     * Create a DTO instance from the raw database array.
     */
    public static function fromArray(array $data): self
    {
        return new self(
            totalReports: (int)($data['total_reports'] ?? 0),
            appearYesCount: (int)($data['appear_yes_count'] ?? 0),
            appearNoCount: (int)($data['appear_no_count'] ?? 0),
            severityMild: (int)($data['severity_mild'] ?? 0),
            severityModerate: (int)($data['severity_moderate'] ?? 0),
            severitySevere: (int)($data['severity_severe'] ?? 0),
            framingSerious: (int)($data['framing_serious'] ?? 0),
            framingNeutral: (int)($data['framing_neutral'] ?? 0),
            framingRomanticized: (int)($data['framing_romanticized'] ?? 0),
            framingComedic: (int)($data['framing_comedic'] ?? 0),
        );
    }
}
