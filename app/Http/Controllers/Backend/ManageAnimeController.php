<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Services\AnimeService;
use Inertia\Inertia;
use Inertia\Response;

class ManageAnimeController extends Controller
{
    public function __construct(private AnimeService $animeService) {}

    public function index(): Response
    {
        $filter = [];
        $sort = [];
        $animes = $this->animeService->fetchAnimes(
            filter: $filter,
            sort: $sort,
            paginateLimit: 15
        );

        return Inertia::render('Backend/Anime/Index', [
            'animes' => $animes,
        ]);
    }
}
