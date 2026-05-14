<?php

namespace App\Http\Controllers;

use App\Services\AnimeService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BrowseController extends Controller
{
    public function __construct(private AnimeService $animeService) {}

    public function Index(Request $request): Response
    {
        $isAiring = $request->airing;
        // dd($isAiring);
        $animes = $this->animeService->fetchAnimes(paginateLimit: 15, isAiring: $isAiring);

        return Inertia::render('Browse/Index', [
            'animes' => $animes,
        ]);
    }
}
