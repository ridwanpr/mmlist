<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class UserDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('UserDash/Index');
    }
}
