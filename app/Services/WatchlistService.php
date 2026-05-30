<?php

namespace App\Services;

use App\DTOs\PaginatedWatchlistData;
use App\DTOs\WatchlistData;
use App\Models\Anime;
use App\Models\AnimeTrigger;
use App\Models\Watchlist;
use Illuminate\Support\Facades\DB;

class WatchlistService
{
    public function storeUserWatchlist(WatchlistData $data): void
    {
        $anime = Anime::where('mal_id', $data->anime_id)->firstOrFail();
        Watchlist::updateOrCreate(
            [
                'user_id' => $data->user_id,
                'anime_id' => $anime->id,
            ],
            [
                'status' => $data->status,
                'progress' => $data->progress,
                'score' => $data->score,
                'note' => $data->note,
            ]
        );
    }

    public function findUserWatchlist(int $userId, int $animeId): ?WatchlistData
    {
        $data = Watchlist::where('user_id', $userId)
            ->where('anime_id', $animeId)
            ->first();

        if (! $data) {
            return null;
        }

        return WatchlistData::fromModel($data);
    }

    public function deleteWatchlist(int $watchlistId): void
    {
        Watchlist::where('id', $watchlistId)->delete();
    }

    public function getUserWatchlist(
        int $paginateLimit,
        int $userId,
        ?string $status = null,
        ?string $sort = 'latest',
        ?string $search = null,
        array $filters = []
    ): PaginatedWatchlistData {
        $query = Watchlist::where('watchlists.user_id', $userId)
            ->join('animes', 'animes.id', '=', 'watchlists.anime_id')
            ->select(
                'watchlists.*',
                'animes.title',
                'animes.type',
                'animes.episodes',
                'animes.images',
                'animes.year',
                'animes.slug'
            );

        if ($status && $status !== 'all') {
            $query->where('watchlists.status', $status);
        }

        // Smart search logic implementation
        $booleanTerm = null;
        if (filled($search)) {
            $rawTerm = trim($search);
            $booleanTerm = $this->buildBooleanSearch($rawTerm);

            if ($booleanTerm !== null) {
                $query->whereRaw(
                    'MATCH(title, title_english, title_japanese, title_synonyms_text) AGAINST (? IN BOOLEAN MODE)',
                    [$booleanTerm]
                );

                $query->selectRaw(
                    'MATCH(title, title_english, title_japanese, title_synonyms_text) AGAINST (? IN BOOLEAN MODE) AS relevance',
                    [$booleanTerm]
                );
            } else {
                $query->where(function ($subQuery) use ($rawTerm) {
                    $subQuery->where('animes.title', 'like', '%' . $rawTerm . '%')
                        ->orWhere('animes.title_english', 'like', '%' . $rawTerm . '%')
                        ->orWhere('animes.title_japanese', 'like', '%' . $rawTerm . '%')
                        ->orWhere('animes.title_synonyms_text', 'like', '%' . $rawTerm . '%');
                });
            }
        }

        $query = $this->applyAdvancedFilters($query, $filters);

        // Sorting priority: Handle text relevance for default queries
        if (filled($search) && $booleanTerm !== null && $sort === 'latest') {
            $query->orderByDesc('relevance');
        } elseif ($sort === 'latest') {
            $query->orderBy('watchlists.created_at', 'desc');
        } elseif ($sort === 'score') {
            $query->orderBy('watchlists.score', 'desc');
        } elseif ($sort === 'oldest') {
            $query->orderBy('watchlists.created_at', 'asc');
        }

        $paginator = $query->paginate($paginateLimit)->onEachSide(1)->withQueryString();
        $paginator->through(fn($item) => WatchlistData::fromModel($item));

        return PaginatedWatchlistData::fromPaginator($paginator);
    }

    public function getTabCounts(int $userId, ?string $search = null, array $filters = []): array
    {
        $query = Watchlist::where('watchlists.user_id', $userId);

        if (! empty($search) || ! empty($filters)) {
            $query->join('animes', 'animes.id', '=', 'watchlists.anime_id');
        }

        // Replicating smart search filtering for accurate tab counters
        if (filled($search)) {
            $rawTerm = trim($search);
            $booleanTerm = $this->buildBooleanSearch($rawTerm);

            if ($booleanTerm !== null) {
                $query->whereRaw(
                    'MATCH(title, title_english, title_japanese, title_synonyms_text) AGAINST (? IN BOOLEAN MODE)',
                    [$booleanTerm]
                );
            } else {
                $query->where(function ($subQuery) use ($rawTerm) {
                    $subQuery->where('animes.title', 'like', '%' . $rawTerm . '%')
                        ->orWhere('animes.title_english', 'like', '%' . $rawTerm . '%')
                        ->orWhere('animes.title_japanese', 'like', '%' . $rawTerm . '%')
                        ->orWhere('animes.title_synonyms_text', 'like', '%' . $rawTerm . '%');
                });
            }
        }

        $query = $this->applyAdvancedFilters($query, $filters);

        $counts = $query->select('watchlists.status', DB::raw('count(*) as total'))
            ->groupBy('watchlists.status')
            ->pluck('total', 'watchlists.status')
            ->toArray();

        return [
            'watching' => $counts['watching'] ?? 0,
            'completed' => $counts['completed'] ?? 0,
            'planned' => $counts['planned'] ?? 0,
            'on_hold' => $counts['on_hold'] ?? 0,
            'dropped' => $counts['dropped'] ?? 0,
        ];
    }

    public function getTotalVoteCount(int $userId): int
    {
        return AnimeTrigger::where('user_id', $userId)->count();
    }

    public function updateWatchlist(int $userId, int $watchlistId, array $data): void
    {
        $watchlist = Watchlist::query()
            ->where('id', $watchlistId)
            ->where('user_id', $userId)
            ->firstOrFail();

        $watchlist->update([
            'status' => $data['status'],
            'progress' => $data['progress'] ?? $watchlist->progress,
            'score' => array_key_exists('score', $data) ? $data['score'] : $watchlist->score,
            'note' => $data['note'] ?? $watchlist->note,
            'started_at' => $data['started_at'] ?? $watchlist->started_at,
            'completed_at' => $data['completed_at'] ?? $watchlist->completed_at,
        ]);
    }

    /**
     * Calculate the average score of the current filtered subset
     */
    public function getAverageScore(int $userId, ?string $status = null, ?string $search = null, array $filters = []): ?float
    {
        $query = Watchlist::where('watchlists.user_id', $userId)
            ->join('animes', 'animes.id', '=', 'watchlists.anime_id');

        if ($status && $status !== 'all') {
            $query->where('watchlists.status', $status);
        }

        if (filled($search)) {
            $rawTerm = trim($search);
            $booleanTerm = $this->buildBooleanSearch($rawTerm);

            if ($booleanTerm !== null) {
                $query->whereRaw(
                    'MATCH(title, title_english, title_japanese, title_synonyms_text) AGAINST (? IN BOOLEAN MODE)',
                    [$booleanTerm]
                );
            } else {
                $query->where(function ($subQuery) use ($rawTerm) {
                    $subQuery->where('animes.title', 'like', '%' . $rawTerm . '%')
                        ->orWhere('animes.title_english', 'like', '%' . $rawTerm . '%')
                        ->orWhere('animes.title_japanese', 'like', '%' . $rawTerm . '%')
                        ->orWhere('animes.title_synonyms_text', 'like', '%' . $rawTerm . '%');
                });
            }
        }

        $query = $this->applyAdvancedFilters($query, $filters);

        $avg = $query->whereNotNull('watchlists.score')->avg('watchlists.score');

        return $avg ? round($avg, 2) : null;
    }

    /**
     * Handle advanced dynamic parameter mapping aligned with database types
     */
    private function applyAdvancedFilters($query, array $filters)
    {
        // 1. Watched Date Range Matrix Bound Checks
        if (! empty($filters['from_watched'])) {
            $query->where(function ($q) use ($filters) {
                $q->whereDate('watchlists.started_at', '>=', $filters['from_watched'])
                    ->orWhereDate('watchlists.completed_at', '>=', $filters['from_watched']);
            });
        }
        if (! empty($filters['to_watched'])) {
            $query->where(function ($q) use ($filters) {
                $q->whereDate('watchlists.started_at', '<=', $filters['to_watched'])
                    ->orWhereDate('watchlists.completed_at', '<=', $filters['to_watched']);
            });
        }

        // 2. Clean Anime Airing Year Range Bound Checks
        if (! empty($filters['from_airing'])) {
            $query->where('animes.year', '>=', (int) $filters['from_airing']);
        }
        if (! empty($filters['to_airing'])) {
            $query->where('animes.year', '<=', (int) $filters['to_airing']);
        }

        // 3. Season & Production Type Check
        if (! empty($filters['season'])) {
            $query->where('animes.season', $filters['season']);
        }
        if (! empty($filters['type'])) {
            $query->where('animes.type', $filters['type']);
        }

        // 4. Personal Score Range Checks (unsignedTinyInteger)
        if (! empty($filters['from_score'])) {
            $query->where('watchlists.score', '>=', (int) $filters['from_score']);
        }
        if (! empty($filters['to_score'])) {
            $query->where('watchlists.score', '<=', (int) $filters['to_score']);
        }

        // 5. Genres 3-State Logic Filtering
        if (! empty($filters['genres_include'])) {
            $includeIds = explode(',', $filters['genres_include']);
            foreach ($includeIds as $id) {
                $query->whereIn('watchlists.anime_id', Anime::whereHas('genres', function ($q) use ($id) {
                    $q->where('genres.id', $id);
                })->select('id'));
            }
        }
        if (! empty($filters['genres_exclude'])) {
            $excludeIds = explode(',', $filters['genres_exclude']);
            $query->whereNotIn('watchlists.anime_id', Anime::whereHas('genres', function ($q) use ($excludeIds) {
                $q->whereIn('genres.id', $excludeIds);
            })->select('id'));
        }

        // 6. Themes 3-State Logic Filtering
        if (! empty($filters['themes_include'])) {
            $includeIds = explode(',', $filters['themes_include']);
            foreach ($includeIds as $id) {
                $query->whereIn('watchlists.anime_id', Anime::whereHas('themes', function ($q) use ($id) {
                    $q->where('themes.id', $id);
                })->select('id'));
            }
        }
        if (! empty($filters['themes_exclude'])) {
            $excludeIds = explode(',', $filters['themes_exclude']);
            $query->whereNotIn('watchlists.anime_id', Anime::whereHas('themes', function ($q) use ($excludeIds) {
                $q->whereIn('themes.id', $excludeIds);
            })->select('id'));
        }

        return $query;
    }

    /**
     * Build standard boolean full-text search string with stopword exclusion
     */
    private function buildBooleanSearch(string $input): ?string
    {
        $input = trim(mb_strtolower($input));

        if ($input === '') {
            return null;
        }

        $tokens = preg_split('/[^\p{L}\p{N}]+/u', $input, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $stopwords = [
            'a',
            'an',
            'as',
            'at',
            'in',
            'is',
            'it',
            'of',
            'on',
            'or',
            'to',
            'am',
            'be',
            'by',
            'do',
            'he',
            'if',
            'me',
            'my',
            'no',
            'so',
            'up',
            'us',
            'we',
            'i',
            'and',
            'the',
            'for',
            'with',
            'about',
            'are',
            'from',
            'how',
            'that',
            'this',
            'was',
            'what',
            'when',
            'where',
            'who',
            'will',
        ];

        $tokens = array_values(array_filter($tokens, static function ($token) use ($stopwords) {
            return ! in_array($token, $stopwords, true);
        }));

        if ($tokens === []) {
            return null;
        }

        return implode(' ', array_map(static fn($token) => '+' . $token . '*', $tokens));
    }
}
