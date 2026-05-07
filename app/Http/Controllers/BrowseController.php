<?php

namespace App\Http\Controllers;

use App\Services\AnimeService;
use Inertia\Inertia;
use Inertia\Response;

class BrowseController extends Controller
{
    public function __construct(private AnimeService $animeService) {}


    public function Index(): Response
    {
        $animes = $this->animeService->fetchNowAiring();

        return Inertia::render('Browse/Index', [
            'animes' => $animes,
        ]);
    }
}
