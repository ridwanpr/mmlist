<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function Index(): Response
    {
        return Inertia::render('Home/Index');
    }
}
