<?php

namespace App\DTOs;

readonly class AnimeTitleData
{
    public function __construct(
        public string $type,
        public string $title,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            type: $data['type'],
            title: $data['title']
        );
    }
}
