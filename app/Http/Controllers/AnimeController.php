<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AnimeController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Anime/Show');
    }
}
