<?php

namespace App\Http\Controllers;

use App\Services\StatService;
use App\Services\UserService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class UserDashboardController extends Controller
{
    public function __construct(
        private UserService $userService,
        private StatService $statService
    ) {}

    public function index(): Response
    {
        $user = Auth::user();

        $watchlistStat = $this->statService->getWatchlistStat($user->id);
        $triggerFramingStat = $this->statService->getTriggerFramingStat($user->id);
        $countStat = $this->statService->getCountStat($user->id);

        return Inertia::render('UserDash/Index', [
            'watchlistStat' => $watchlistStat,
            'triggerFramingStat' => $triggerFramingStat,
            'countStat' => $countStat
        ]);
    }

    public function settingIndex(): Response
    {
        $user = $this->userService->findUserByUsername(Auth::user()->username);

        return Inertia::render("UserSetting/Index", [
            'user' => $user
        ]);
    }
}
