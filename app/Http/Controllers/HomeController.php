<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function Index(): Response
    {
        return Inertia::render('Home/Index');
    }
}
