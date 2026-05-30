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
        ?string $search = null
    ): PaginatedWatchlistData {
        $query = Watchlist::where('user_id', $userId)
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

        if ($status) {
            $query->where('watchlists.status', $status);
        }

        if (! empty($search)) {
            $query->whereFullText(
                ['animes.title', 'animes.title_english', 'animes.title_japanese', 'animes.title_synonyms_text'],
                $search
            );
        }

        if ($sort === 'latest') {
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

    public function getTabCounts(int $userId, ?string $search = null): array
    {
        $query = Watchlist::where('watchlists.user_id', $userId);

        if (! empty($search)) {
            $query->join('animes', 'animes.id', '=', 'watchlists.anime_id')
                ->whereFullText(
                    ['animes.title', 'animes.title_english', 'animes.title_japanese', 'animes.title_synonyms_text'],
                    $search
                );
        }

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
}
