<?php

namespace App\Http\Controllers;

use App\Http\Requests\BrowseAnimeRequest;
use App\Services\AnimeService;
use Inertia\Inertia;
use Inertia\Response;

class BrowseController extends Controller
{
    public function __construct(private AnimeService $animeService) {}

    public function Index(BrowseAnimeRequest $request): Response
    {
        $validated = $request->validated();

        $filter = [
            'airing' => $validated['airing'] ?? null
        ];

        $sort = [
            'sort' => $validated['sort'] ?? null,
            'order' =>  $validated['order'] ?? null
        ];

        $animes = $this->animeService->fetchAnimes(
            filter: $filter,
            sort: $sort,
            paginateLimit: 24
        );

        return Inertia::render('Browse/Index', [
            'animes' => $animes,
        ]);
    }
}
