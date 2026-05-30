<?php

namespace App\Http\Controllers;

use App\DTOs\WatchlistData;
use App\Http\Requests\StoreWatchlistRequest;
use App\Http\Requests\UpdateWatchlistRequest;
use App\Services\MasterService;
use App\Services\WatchlistService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class WatchlistController extends Controller
{
    public function __construct(
        private WatchlistService $watchlistService,
        private MasterService $masterService
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
        $search = $request->query('search');

        $sortInput = $request->query('sort');
        $allowedSorts = ['latest', 'score', 'oldest'];
        $sortBy = in_array($sortInput, $allowedSorts) ? $sortInput : 'latest';

        $watchlists = $this->watchlistService->getUserWatchlist(
            paginateLimit: 21,
            userId: $user->id,
            status: $status,
            sort: $sortBy,
            search: $search
        );

        $tabCounts = $this->watchlistService->getTabCounts($user->id, $search);

        $genres = $this->masterService->getGenres();
        $themes = $this->masterService->getThemes();
        $year = $this->masterService->getAnimeYear();
        $type = $this->masterService->getType();
        $season = $this->masterService->getSeason();
        $rating = $this->masterService->getRating();

        return Inertia::render(
            'Watchlist/Index',
            [
                'watchlists' => $watchlists,
                'status' => $status,
                'tabCounts' => $tabCounts,
                'sortBy' => $sortBy,
                'search' => $search,
                // Filter Master Data
                'masterFilter' => [
                    'genres' => $genres,
                    'themes' => $themes,
                    'year' => $year,
                    'type' => $type,
                    'season' => $season,
                    'rating' => $rating,
                ]
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
