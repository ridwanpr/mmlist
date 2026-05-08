<?php

namespace App\DTOs;

use Spatie\TypeScriptTransformer\Attributes\TypeScript;

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
     */
    public function __construct(
        public int $malId,
        public string $url,
        public ?string $season,
        public ?int $year,
        public ?array $images,
        public ?array $trailer,
        public bool $approved,
        public ?array $titles,
        public string $title,
        public ?string $titleEnglish,
        public ?string $titleJapanese,
        public ?array $title_synonyms,
        public ?string $type,
        public ?string $source,
        public ?string $episodes,
        public ?string $status,
        public bool $airing,
        public ?array $aired,
        public ?string $duration,
        public ?string $rating,
        public ?float $score,
        public ?string $synopsis,
        public ?string $background,

        public ?array $demographics,
        public ?array $genres,
        public ?array $producers,
        public ?array $studios,
        public ?array $themes,
    ) {}

    /**
     * @param  array<string, mixed>  $data
     */
    public static function fromArray(array $data): self
    {
        return new self(
            malId: $data['mal_id'],
            url: $data['url'],
            season: $data['season'] ?? null,
            year: $data['year'] ?? null,
            images: $data['images'] ?? null,
            trailer: $data['trailer'] ?? null,
            approved: $data['approved'] ?? false,
            title: $data['title'],
            titleEnglish: $data['title_english'] ?? null,
            titleJapanese: $data['title_japanese'] ?? null,
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

            titles: isset($data['titles']) ?
                array_map(
                    fn(array $item) => AnimeTitleData::fromArray($item),
                    $data['titles']
                ) : null,

            demographics: isset($data['demographics'])
                ? array_map(
                    fn(array $item) => AnimeMetaData::fromArray($item),
                    $data['demographics']
                )
                : null,

            genres: isset($data['genres'])
                ? array_map(
                    fn(array $item) => AnimeMetaData::fromArray($item),
                    $data['genres']
                )
                : null,

            producers: isset($data['producers'])
                ? array_map(
                    fn(array $item) => AnimeMetaData::fromArray($item),
                    $data['producers']
                )
                : null,

            studios: isset($data['studios'])
                ? array_map(
                    fn(array $item) => AnimeMetaData::fromArray($item),
                    $data['studios']
                )
                : null,

            themes: isset($data['themes'])
                ? array_map(
                    fn(array $item) => AnimeMetaData::fromArray($item),
                    $data['themes']
                )
                : null,
        );
    }

    /**
     * Map data from a standard database object to the DTO.
     */
    public static function fromDatabase(\stdClass $data): self
    {
        // Helper to safely decode JSON strings from the database
        $decodeJson = fn(?string $json) => $json ? json_decode($json, true) : null;

        $decodedTitles = $decodeJson($data->titles ?? null);

        return new self(
            malId: (int) $data->mal_id,
            url: $data->url,
            season: $data->season ?? null,
            year: $data->year ?? null,
            images: $decodeJson($data->images ?? null),
            trailer: $decodeJson($data->trailer ?? null),
            approved: (bool) ($data->approved ?? false),
            title: $data->title,
            titleEnglish: $data->title_english ?? null,
            titleJapanese: $data->title_japanese ?? null,
            title_synonyms: $decodeJson($data->title_synonyms ?? null),
            type: $data->type ?? null,
            source: $data->source ?? null,
            episodes: $data->episodes ?? null,
            status: $data->status ?? null,
            airing: (bool) ($data->airing ?? false),
            aired: $decodeJson($data->aired ?? null),
            duration: $data->duration ?? null,
            rating: $data->rating ?? null,
            score: isset($data->score) ? (float) $data->score : null,
            synopsis: $data->synopsis ?? null,
            background: $data->background ?? null,

            titles: $decodedTitles
                ? array_map(fn(array $item) => AnimeTitleData::fromArray($item), $decodedTitles)
                : null,

            demographics: isset($data->demographics) && is_string($data->demographics)
                ? array_map(fn(array $item) => AnimeMetaData::fromArray($item), $decodeJson($data->demographics))
                : ($data->demographics ?? null),

            genres: isset($data->genres) && is_string($data->genres)
                ? array_map(fn(array $item) => AnimeMetaData::fromArray($item), $decodeJson($data->genres))
                : ($data->genres ?? null),

            producers: isset($data->producers) && is_string($data->producers)
                ? array_map(fn(array $item) => AnimeMetaData::fromArray($item), $decodeJson($data->producers))
                : ($data->producers ?? null),

            studios: isset($data->studios) && is_string($data->studios)
                ? array_map(fn(array $item) => AnimeMetaData::fromArray($item), $decodeJson($data->studios))
                : ($data->studios ?? null),

            themes: isset($data->themes) && is_string($data->themes)
                ? array_map(fn(array $item) => AnimeMetaData::fromArray($item), $decodeJson($data->themes))
                : ($data->themes ?? null),
        );
    }
}
