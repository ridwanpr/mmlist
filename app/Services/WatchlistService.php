<?php

namespace App\Services;

use App\Models\Watchlist;
use App\DTOs\WatchlistData;
use App\Models\Anime;

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

    public function findUserWatchlist(int $userId, int $animeId)
    {
        return Watchlist::where('user_id', $userId)
            ->where('anime_id', $animeId)
            ->first();
    }

    public function deleteWatchlist(int $watchlistId): void
    {
        Watchlist::where('id', $watchlistId)->delete();
    }
}
