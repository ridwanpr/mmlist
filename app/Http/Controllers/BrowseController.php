<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrowseAnimeRequest;
use App\Services\AnimeService;
use App\Services\MasterService;
use Inertia\Inertia;
use Inertia\Response;

class BrowseController extends Controller
{
    public function __construct(
        private AnimeService $animeService,
        private MasterService $masterService
    ) {}

    public function Index(BrowseAnimeRequest $request): Response
    {
        $validated = $request->validated();

        $filter = [
            'airing'  => $validated['airing'] ?? null,
            'genres'  => $validated['genres'] ?? null,
            'themes'  => $validated['themes'] ?? null,
            'years'   => $validated['years'] ?? null,
            'seasons' => $validated['seasons'] ?? null,
            'types'   => $validated['types'] ?? null,
            'query'   => $validated['query'] ?? null,
        ];

        $sort = [
            'sort'  => $validated['sort'] ?? null,
            'order' => $validated['order'] ?? null,
        ];

        $animes = $this->animeService->fetchAnimes(
            filter: $filter,
            sort: $sort,
            paginateLimit: 24
        );

        $genres = $this->masterService->getGenres();
        $themes = $this->masterService->getThemes();
        $year = $this->animeService->getAnimeYear();
        $type = $this->masterService->getType();
        $season = $this->masterService->getSeason();
        $rating = $this->masterService->getRating();

        return Inertia::render('Browse/Index', [
            'animes' => $animes,
            'genres' => $genres,
            'themes' => $themes,
            'year' => $year,
            'type' => $type,
            'season' => $season,
            'rating' => $rating,
            'filters' => [
                'query'   => $validated['query'] ?? '',
                'genres'  => $validated['genres'] ?? [],
                'themes'  => $validated['themes'] ?? [],
                'years'   => $validated['years'] ?? [],
                'seasons' => $validated['seasons'] ?? [],
                'types'   => $validated['types'] ?? [],
                'rating'   => $validated['rating'] ?? [],
            ],
        ]);
    }
}
