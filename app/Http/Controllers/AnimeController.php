<?php

namespace App\Http\Controllers;

use App\Services\AnimeService;
use Inertia\Inertia;
use Inertia\Response;

class AnimeController extends Controller
{
    public function __construct(private AnimeService $animeService) {}

    public function show(string $slug): Response
    {
        $result = $this->animeService->getAnimeInfo($slug);
        $triggers = $this->animeService->getAnimeTriggers($result->id);
        dd($result);

        return Inertia::render('Anime/Show', [
            'result' => $result,
            'triggers' => $triggers
        ]);
    }
}
