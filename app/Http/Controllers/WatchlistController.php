<?php

namespace App\Http\Controllers;

use App\DTOs\WatchlistData;
use App\Http\Requests\StoreWatchlistRequest;
use App\Services\WatchlistService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class WatchlistController extends Controller
{
    public function __construct(
        protected WatchlistService $watchlistService
    ) {}

    public function store(StoreWatchlistRequest $request): RedirectResponse
    {
        $watchlistData = WatchlistData::fromRequest($request);
        $this->watchlistService->storeUserWatchlist($watchlistData);

        Inertia::flash('success', 'Added to watchlist');

        return back();
    }

    public function destroy(int $wachlistId): RedirectResponse
    {
        $this->watchlistService->deleteWatchlist($wachlistId);

        return back();
    }
}
