<?php

namespace App\Services;

use App\DTOs\PaginatedAnimeData;
use App\DTOs\PaginatedWatchlistData;
use App\DTOs\WatchlistData;
use App\Models\Anime;
use App\Models\Watchlist;
use Illuminate\Support\Collection;

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

    public function getUserWatchlist(int $paginateLimit, int $userId): PaginatedWatchlistData
    {
        $paginator = Watchlist::where('user_id', $userId)
            ->join('animes', 'animes.id', 'watchlists.anime_id')
            ->select(
                'watchlists.*',
                'animes.title',
                'animes.type',
                'animes.episodes',
                'animes.images',
                'animes.year'
            )
            ->paginate($paginateLimit);

        // Use through() to map internal items without losing pagination metadata
        $paginator->through(fn($item) => WatchlistData::fromModel($item));

        // Wrap the transformed paginator inside your DTO
        return PaginatedWatchlistData::fromPaginator($paginator);
    }
}
