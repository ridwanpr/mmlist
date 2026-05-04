<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function login(): Response
    {
        return Inertia::render("Auth/Login");
    }

    public function loginAction() {}

    public function register(): Response
    {
        return Inertia::render("Auth/Register");
    }

    public function registerAction() {}
}
