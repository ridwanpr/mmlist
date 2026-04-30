<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AnimeController extends Controller
{
    public function show()
    {
        return Inertia::render("Anime/Show");
    }
}
