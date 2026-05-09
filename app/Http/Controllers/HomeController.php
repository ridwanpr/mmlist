<?php

namespace App\Http\Controllers;

use App\Models\Anime;
use App\Services\AnimeService;
use Illuminate\Support\Facades\Concurrency;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __construct(private AnimeService $animeService) {}

    public function Index(): Response
    {
        // [$nowAiring, $topAnime] = Concurrency::run([
        //     fn() => $this->animeService->fetchNowAiring(),
        //     fn() => $this->animeService->fetchTopAnime(),
        // ]);

        $nowAiring = $this->animeService->fetchNowAiring();
        $topAnime = $this->animeService->fetchTopAnime();

        return Inertia::render('Home/Index', [
            'nowAiring' => $nowAiring,
            'topAnime' => $topAnime,
        ]);
    }
}
