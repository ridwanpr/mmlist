<?php

namespace App\DTOs;

use App\Models\Anime;
use App\Utils\GenerateSlug;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;
use stdClass;

#[TypeScript]
readonly class AnimeData
{
    /**
     * @param  array<string, mixed>  $aired
     * @param  array<string, mixed>  $images
     * @param  array<string, mixed>  $trailer
     * @param  array<int, mixed>  $title_synonyms
     * @param  AnimeTitleData[]  $titles
     * @param  AnimeMetaData[]  $themes
     * @param  AnimeMetaData[]  $studios
     * @param  AnimeMetaData[]  $producers
     * @param  AnimeMetaData[]  $demographics
     * @param  AnimeMetaData[]  $genres
     * @param  AnimeTriggerData[]  $triggers
     */
    public function __construct(
        public int $mal_id,
        public string $url,
        public ?string $season,
        public ?int $year,
        public ?array $images,
        public ?array $trailer,
        public bool $approved,
        public ?array $titles,
        public string $title,
        public ?string $title_english,
        public ?string $title_japanese,
        public ?array $title_synonyms,
        public ?string $type,
        public ?string $source,
        public ?int $episodes,
        public ?string $status,
        public bool $airing,
        public ?array $aired,
        public ?string $duration,
        public ?string $rating,
        public ?float $score,
        public ?string $synopsis,
        public ?string $background,
        public ?int $rank,
        public ?array $demographics,
        public ?array $genres,
        public ?array $producers,
        public ?array $studios,
        public ?array $themes,
        public ?array $triggers,
        public string $slug,
        public ?string $ai_advisory
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            mal_id: $data['mal_id'],
            url: $data['url'],
            season: $data['season'] ?? null,
            year: $data['year'] ?? null,
            images: $data['images'] ?? null,
            trailer: $data['trailer'] ?? null,
            approved: $data['approved'] ?? false,
            title: $data['title'],
            title_english: $data['title_english'] ?? null,
            title_japanese: $data['title_japanese'] ?? null,
            title_synonyms: $data['title_synonyms'] ?? null,
            type: $data['type'] ?? null,
            source: $data['source'] ?? null,
            episodes: $data['episodes'] ?? null,
            status: $data['status'] ?? null,
            airing: $data['airing'] ?? false,
            aired: $data['aired'] ?? null,
            duration: $data['duration'] ?? null,
            rating: $data['rating'] ?? null,
            score: isset($data['score']) ? (float) $data['score'] : null,
            synopsis: $data['synopsis'] ?? null,
            background: $data['background'] ?? null,
            rank: $data['rank'] ?? null,
            slug: GenerateSlug::generate($data['title'], $data['mal_id']),
            ai_advisory: $data['ai_advisory'] ?? null,

            titles: isset($data['titles'])
                ? array_map(fn(array $item) => AnimeTitleData::fromArray($item), $data['titles'])
                : null,

            demographics: isset($data['demographics'])
                ? array_map(fn(array $item) => AnimeMetaData::fromArray($item), $data['demographics'])
                : null,

            genres: isset($data['genres'])
                ? array_map(fn(array $item) => AnimeMetaData::fromArray($item), $data['genres'])
                : null,

            producers: isset($data['producers'])
                ? array_map(fn(array $item) => AnimeMetaData::fromArray($item), $data['producers'])
                : null,

            studios: isset($data['studios'])
                ? array_map(fn(array $item) => AnimeMetaData::fromArray($item), $data['studios'])
                : null,

            themes: isset($data['themes'])
                ? array_map(fn(array $item) => AnimeMetaData::fromArray($item), $data['themes'])
                : null,

            triggers: null,
        );
    }

    /**
     * Map data from an Eloquent Anime model to the DTO.
     */
    public static function fromModel(Anime $model): self
    {
        // Helper for JSON cast columns
        $decodeJsonColumn = fn(mixed $value): ?array => match (true) {
            is_array($value) => $value,
            is_string($value) => json_decode($value, true),
            default => null,
        };

        // Helper to safely load and map Eloquent relationship Collections
        $mapRelation = fn(string $relation) => $model->relationLoaded($relation) && $model->{$relation}
            ? $model->{$relation}->map(fn($item) => AnimeMetaData::fromArray($item->toArray()))->toArray()
            : null;

        $decodedTitles = $decodeJsonColumn($model->titles);

        return new self(
            mal_id: (int) $model->mal_id,
            url: $model->url,
            season: $model->season ?? null,
            year: $model->year ?? null,
            images: $decodeJsonColumn($model->images),
            trailer: $decodeJsonColumn($model->trailer),
            approved: (bool) ($model->approved ?? false),
            title: $model->title,
            title_english: $model->title_english ?? null,
            title_japanese: $model->title_japanese ?? null,
            title_synonyms: $decodeJsonColumn($model->title_synonyms),
            type: $model->type ?? null,
            source: $model->source ?? null,
            episodes: $model->episodes ?? null,
            status: $model->status ?? null,
            airing: (bool) ($model->airing ?? false),
            aired: $decodeJsonColumn($model->aired),
            duration: $model->duration ?? null,
            rating: $model->rating ?? null,
            score: isset($model->score) ? (float) $model->score : null,
            synopsis: $model->synopsis ?? null,
            background: $model->background ?? null,
            rank: $model->rank ?? null,
            slug: $model->slug,
            ai_advisory: $model->ai_advisory,

            titles: $decodedTitles
                ? array_map(fn(array $item) => AnimeTitleData::fromArray($item), $decodedTitles)
                : null,

            demographics: $mapRelation('demographics'),
            genres: $mapRelation('genres'),
            producers: $mapRelation('producers'),
            studios: $mapRelation('studios'),
            themes: $mapRelation('themes'),

            triggers: $model->relationLoaded('animeTriggers')
                ? $model->animeTriggers->map(fn($item) => AnimeTriggerData::fromModel($item))->toArray()
                : null
        );
    }
}
