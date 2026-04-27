<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class BrowseController extends Controller
{
    public function Index()
    {
        return Inertia::render('Browse/Index');
    }
}
