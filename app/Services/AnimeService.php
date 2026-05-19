<?php

namespace App\Services;

use App\DTOs\AnimeData;
use App\DTOs\PaginatedData;
use App\DTOs\TriggerData;
use App\Models\Anime;
use App\Models\MasterTrigger;
use Illuminate\Support\Collection;

use function Illuminate\Support\now;

class AnimeService
{
    /**
     * @param  array<string,mixed>  $filter
     * @param  array<string,string>  $sort
     */
    public function fetchAnimes(
        array $filter,
        array $sort,
        int $paginateLimit = 15
    ): PaginatedData {
        $query = Anime::query()
            ->where('animes.rating', '!=', 'Rx - Hentai');

        $query->when(filled($filter['query'] ?? null), function ($q) use ($filter) {
            $rawTerm = trim($filter['query']);
            $booleanTerm = $this->buildBooleanSearch($rawTerm);

            if ($booleanTerm !== null) {
                $q->whereRaw(
                    'MATCH(title, title_english, title_japanese, title_synonyms_text) AGAINST (? IN BOOLEAN MODE)',
                    [$booleanTerm]
                );

                $q->select('animes.id')
                    ->selectRaw(
                        'MATCH(title, title_english, title_japanese, title_synonyms_text) AGAINST (? IN BOOLEAN MODE) AS relevance',
                        [$booleanTerm]
                    )
                    ->orderByDesc('relevance');
            } else {
                $q->where(function ($subQuery) use ($rawTerm) {
                    $subQuery->where('title', 'like', '%' . $rawTerm . '%')
                        ->orWhere('title_english', 'like', '%' . $rawTerm . '%')
                        ->orWhere('title_japanese', 'like', '%' . $rawTerm . '%')
                        ->orWhere('title_synonyms_text', 'like', '%' . $rawTerm . '%');
                });
            }
        });

        // Force the base query to only select IDs if the search didn't already
        if (empty($filter['query']) || $this->buildBooleanSearch(trim($filter['query'])) === null) {
            $query->select('animes.id');
        }

        $query->when(array_key_exists('airing', $filter) && ! is_null($filter['airing']), function ($q) use ($filter) {
            $q->where('animes.airing', (bool) $filter['airing'])->where('animes.year', now()->year);
        });

        $query->when(array_key_exists('upcoming', $filter) && ! is_null($filter['upcoming']), function ($q) {
            $q->where('animes.year', '>', now()->year);
        });

        $query->when(! empty($filter['genres']), function ($q) use ($filter) {
            $q->whereHas('genres', function ($q) use ($filter) {
                $q->whereIn('genres.id', (array) $filter['genres']);
            });
        });

        $query->when(! empty($filter['themes']), function ($q) use ($filter) {
            $q->whereHas('themes', function ($q) use ($filter) {
                $q->whereIn('themes.id', (array) $filter['themes']);
            });
        });

        $query->when(! empty($filter['years']), function ($q) use ($filter) {
            $q->whereIn('animes.year', (array) $filter['years']);
        });

        $query->when(! empty($filter['seasons']), function ($q) use ($filter) {
            $q->whereIn('animes.season', (array) $filter['seasons']);
        });

        $query->when(! empty($filter['types']), function ($q) use ($filter) {
            $q->whereIn('animes.type', (array) $filter['types']);
        });

        $query->when(! empty($sort['sort']), function ($q) use ($sort) {
            $direction = strtolower($sort['order'] ?? 'asc') === 'desc' ? 'desc' : 'asc';
            $q->orderBy('animes.' . $sort['sort'], $direction);
        }, function ($q) {
            $q->orderByRaw("animes.type = 'TV' DESC")
                ->orderBy('animes.year', 'desc')
                ->orderBy('animes.airing', 'desc')
                ->orderBy('animes.score', 'desc');
        });

        $paginator = $query
            ->paginate($paginateLimit)
            ->onEachSide(1)
            ->withQueryString();

        // Deferred Join: Hydrate the heavy models only for the current page
        if ($paginator->isNotEmpty()) {
            $ids = $paginator->pluck('id')->toArray();

            // Fetch the full data and eager load relationships for these 24 IDs
            $models = Anime::with(['genres', 'animeTriggers.triggerContent'])
                ->whereIn('id', $ids)
                ->get()
                ->keyBy('id'); // Index by ID for easy lookup

            // Replace the bare IDs in the paginator with the fully loaded models, preserving the sorted order
            $sortedModels = collect($ids)->map(fn($id) => $models[$id]);
            $paginator->setCollection($sortedModels);
        }

        $transformed = $paginator->through(fn(Anime $item): AnimeData => AnimeData::fromModel($item));

        return PaginatedData::fromPaginator($transformed);
    }

    /**
     * @return array<int, AnimeData>
     */
    public function fetchTopAnime(int $limit = 8): array
    {
        $topIds = Anime::query()
            ->where('rating', '!=', 'Rx - Hentai')
            ->orderByRaw("animes.type = 'TV' DESC")
            ->orderBy('animes.score', 'desc')
            ->orderBy('animes.year', 'desc')
            ->orderBy('animes.airing', 'desc')
            ->limit($limit)
            ->pluck('id');

        if ($topIds->isEmpty()) {
            return [];
        }

        $animes = Anime::with(['genres', 'animeTriggers.triggerContent'])
            ->whereIn('id', $topIds)
            ->get()
            ->keyBy('id');

        return $topIds->map(fn($id) => AnimeData::fromModel($animes[$id]))->values()->all();
    }

    /**
     * @return array<int, AnimeData>
     */
    public function getNowAiringFromDatabase(int $limit = 12): array
    {
        $airingIds = Anime::query()
            ->where('airing', true)
            ->where('year', now()->year)
            ->where('rating', '!=', 'Rx - Hentai')
            ->orderByRaw("animes.type = 'TV' DESC")
            ->orderBy('animes.year', 'desc')
            ->orderBy('animes.airing', 'desc')
            ->orderBy('animes.score', 'desc')
            ->orderBy('score', 'desc')
            ->limit($limit)
            ->pluck('id');

        if ($airingIds->isEmpty()) {
            return [];
        }

        $animes = Anime::with(['genres', 'animeTriggers.triggerContent'])
            ->whereIn('id', $airingIds)
            ->get()
            ->keyBy('id');

        return $animes->map(fn($item) => AnimeData::fromModel($item))->values()->all();
    }

    public function getAnimeInfo(string $slug): Anime
    {
        return Anime::with(['demographics', 'genres', 'producers', 'studios', 'themes'])
            ->where('slug', $slug)->firstOrFail();
    }

    /**
     * @return Collection<int, TriggerData>
     */
    public function getAnimeTriggers(int $animeId): Collection
    {
        $triggersFromDb = MasterTrigger::with([
            'triggerContents' => function ($query) {
                $query->orderBy('importance', 'desc');
            },
            'triggerContents.animeTriggers' => function ($query) use ($animeId) {
                $query->where('anime_id', $animeId);
            },
        ])
            ->orderBy('importance', 'desc')->get();

        return $triggersFromDb->map(fn(MasterTrigger $trigger) => TriggerData::fromModel($trigger));
    }

    /**
     * @return Collection<int, int>
     */
    public function getAnimeYear(): Collection
    {
        return Anime::whereNotNull('year')
            ->orderBy('year', 'desc')
            ->distinct()
            ->pluck('year');
    }

    private function buildBooleanSearch(string $input): ?string
    {
        $input = trim(mb_strtolower($input));

        if ($input === '') {
            return null;
        }

        $tokens = preg_split('/[^\p{L}\p{N}]+/u', $input, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $stopwords = ['a', 'an', 'and', 'as', 'at', 'for', 'in', 'is', 'it', 'of', 'on', 'or', 'the', 'to', 'with'];

        $tokens = array_values(array_filter($tokens, static function ($token) use ($stopwords) {
            return ! in_array($token, $stopwords, true);
        }));

        if ($tokens === []) {
            return null;
        }

        return implode(' ', array_map(static fn($token) => '+' . $token . '*', $tokens));
    }
}
