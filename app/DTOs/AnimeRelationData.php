<?php

namespace App\DTOs;

use App\Models\AnimeRelation;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class AnimeRelationData
{
    public function __construct(
        public int $id,
        public int $anime_id,
        public int $related_anime_id,
        public string $relation_type,
        public string $created_at,
        public ?string $updated_at,
        public ?AnimeData $anime,
    ) {}

    public static function fromModel(AnimeRelation $model)
    {
        return new self(
            id: $model->id,
            anime_id: $model->anime_id,
            related_anime_id: $model->related_anime_id,
            relation_type: $model->relation_type,
            created_at: $model->created_at,
            updated_at: $model->updated_at ?? null,

            anime: $model->relationLoaded('anime') ? AnimeData::fromModel($model->anime) : null
        );
    }
}
