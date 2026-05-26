<?php

namespace App\Http\Controllers;

use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserDashboardController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function index(): Response
    {
        return Inertia::render('UserDash/Index');
    }

    public function settingIndex(): Response
    {
        $user = $this->userService->findUserByUsername(Auth::user()->username);

        return Inertia::render("UserSetting/Index", [
            'user' => $user
        ]);
    }
}
