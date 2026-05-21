<?php

namespace App\Http\Controllers;

use App\DTOs\WatchlistData;
use App\Http\Requests\StoreWatchlistRequest;
use App\Http\Requests\UpdateWatchlistRequest;
use App\Services\WatchlistService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

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

    public function index(Request $request): Response
    {
        $user = Auth::user();
        if (! $user) {
            abort(401);
        }

        $status = $request->query('status', 'watching');

        $watchlists = $this->watchlistService->getUserWatchlist(
            paginateLimit: 15,
            userId: $user->id,
            status: $status
        );

        $tabCounts = $this->watchlistService->getTabCounts($user->id);

        return Inertia::render(
            'Watchlist/Index',
            [
                "watchlists" => $watchlists,
                "status" => $status,
                "tabCounts" => $tabCounts
            ]
        );
    }

    public function update(UpdateWatchlistRequest $request, int $watchlistId): RedirectResponse
    {
        $this->watchlistService->updateWatchlist(
            userId: $request->user()->id,
            watchlistId: $watchlistId,
            data: $request->validated(),
        );

        Inertia::flash('success', 'Update data success');
        return back();
    }
}
