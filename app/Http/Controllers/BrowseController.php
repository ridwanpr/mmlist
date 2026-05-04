<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class BrowseController extends Controller
{
    public function Index(): Response
    {
        return Inertia::render('Browse/Index');
    }
}
