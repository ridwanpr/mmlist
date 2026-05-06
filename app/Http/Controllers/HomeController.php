<?php

namespace App\Http\Controllers;

use Http;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function Index(): Response
    {
        // $res = Http::get();
        return Inertia::render('Home/Index');
    }
}
