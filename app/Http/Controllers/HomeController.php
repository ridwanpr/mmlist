<?php

namespace App\Http\Controllers;

use App\Services\AnimeService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(private AnimeService $animeService) {}

    public function Index(): Response
    {
        $nowAiring = $this->animeService->getNowAiringFromDatabase();
        $topAnime = $this->animeService->fetchTopAnime();
        $staffPick = $this->animeService->getStaffPickAnime();

        return Inertia::render('Home/Index', [
            'nowAiring' => $nowAiring,
            'topAnime' => $topAnime,
            'staffPick' => $staffPick
        ]);
    }
}
