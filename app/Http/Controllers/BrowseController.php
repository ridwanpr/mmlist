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
        $animes = $this->animeService->fetchAnimes(15);

        return Inertia::render('Browse/Index', [
            'animes' => $animes,
        ]);
    }
}
