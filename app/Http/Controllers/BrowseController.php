<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrowseAnimeRequest;
use App\Services\AnimeService;
use App\Services\MasterService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BrowseController extends Controller
{
    public function __construct(
        private AnimeService $animeService,
        private MasterService $masterService
    ) {}

    public function Index(Request $request): Response
    {
        $filter = [
            'query'          => $request->query('query'),
            'airing'         => $request->query('airing'),
            'upcoming'       => $request->query('upcoming'),
            'from_airing'    => $request->query('from_airing'),
            'to_airing'      => $request->query('to_airing'),
            'season'         => $request->query('season'),
            'type'           => $request->query('type'),
            'rating'         => $request->query('rating'),
            'genres_include' => $request->query('genres_include'),
            'genres_exclude' => $request->query('genres_exclude'),
            'themes_include' => $request->query('themes_include'),
            'themes_exclude' => $request->query('themes_exclude'),
        ];

        $sort = [
            'sort'  => $request->query('sort'),
            'order' => $request->query('order'),
        ];

        $animes = $this->animeService->fetchAnimes(
            filter: $filter,
            sort: $sort,
            paginateLimit: 28
        );

        $genres = $this->masterService->getGenres();
        $themes = $this->masterService->getThemes();
        $year   = $this->animeService->getAnimeYear();
        $type   = $this->masterService->getType();
        $season = $this->masterService->getSeason();
        $rating = $this->masterService->getRating();

        return Inertia::render('Browse/Index', [
            'animes' => $animes,
            'genres' => $genres,
            'themes' => $themes,
            'year'   => $year,
            'type'   => $type,
            'season' => $season,
            'rating' => $rating,
            'filters' => [
                'query'          => $filter['query'] ?? '',
                'from_airing'    => $filter['from_airing'] ?? '',
                'to_airing'      => $filter['to_airing'] ?? '',
                'season'         => $filter['season'] ?? '',
                'type'           => $filter['type'] ?? '',
                'rating'         => $filter['rating'] ?? '',
                'genres_include' => $filter['genres_include'] ?? '',
                'genres_exclude' => $filter['genres_exclude'] ?? '',
                'themes_include' => $filter['themes_include'] ?? '',
                'themes_exclude' => $filter['themes_exclude'] ?? '',
            ],
        ]);
    }
}
