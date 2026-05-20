<?php

namespace App\Services;

use App\DTOs\PaginatedAnimeData;
use App\DTOs\PaginatedWatchlistData;
use App\DTOs\WatchlistData;
use App\Models\Anime;
use App\Models\Watchlist;
use Illuminate\Support\Collection;
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

    public function getUserWatchlist(int $paginateLimit, int $userId, ?string $status = null): PaginatedWatchlistData
    {
        $query = Watchlist::where('user_id', $userId)
            ->join('animes', 'animes.id', 'watchlists.anime_id')
            ->select(
                'watchlists.*',
                'animes.title',
                'animes.type',
                'animes.episodes',
                'animes.images',
                'animes.year'
            );

        if ($status) {
            $query->where('watchlists.status', $status);
        }

        $paginator = $query->paginate($paginateLimit)->withQueryString();

        $paginator->through(fn($item) => WatchlistData::fromModel($item));

        return PaginatedWatchlistData::fromPaginator($paginator);
    }

    public function getTabCounts(int $userId): array
    {
        $counts = Watchlist::where('user_id', $userId)
            ->select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status')
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
        return Watchlist::where('user_id', $userId)->count();
    }
}
