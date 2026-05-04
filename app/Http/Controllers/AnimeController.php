<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnimeController extends Controller
{
    public function show(): Response
    {
        return Inertia::render("Anime/Show");
    }
}
