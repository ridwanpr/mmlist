<?php

namespace App\DTOs;

use Illuminate\Pagination\LengthAwarePaginator;
use Spatie\TypeScriptTransformer\Attributes\TypeScript;

#[TypeScript]
readonly class PaginatedAnimeData
{
    /**
     * @param array<int, AnimeData> $data
     * @param array<int, array{url: ?string, label: string, active: bool}> $links
     */
    public function __construct(
        public array $data,
        public int $current_page,
        public int $last_page,
        public int $per_page,
        public int $total,
        public ?string $next_page_url,
        public ?string $prev_page_url,
        public array $links,
    ) {}

    /**
     * @param LengthAwarePaginator<AnimeData> $paginator
     */
    public static function fromPaginator(LengthAwarePaginator $paginator): self
    {
        return new self(
            data: $paginator->items(),
            current_page: $paginator->currentPage(),
            last_page: $paginator->lastPage(),
            per_page: $paginator->perPage(),
            total: $paginator->total(),
            next_page_url: $paginator->nextPageUrl(),
            prev_page_url: $paginator->previousPageUrl(),
            links: $paginator->linkCollection()->toArray(),
        );
    }
}
