<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\BrowseController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageProxyController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\VoteController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('browse', [BrowseController::class, 'index'])->name('browse.index');

Route::get('anime/{slug}', [AnimeController::class, 'show'])->name('anime.show');
Route::get('/asset/image/{hash}', [ImageProxyController::class, 'show'])->name('proxy.image');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::get('register', [AuthController::class, 'register'])->name('auth.register');
    Route::post('register', [AuthController::class, 'registerAction'])->name('auth.register.action');
    Route::post('login', [AuthController::class, 'loginAction'])->name('login.action');
});

Route::middleware(['auth', 'role:admin'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');

    Route::get('dash', [UserDashboardController::class, 'index'])->name('user.dash.index');

    Route::post('vote-anime-trigger/{triggerContentId}', [VoteController::class, 'voteAnimeTrigger'])
        ->name('vote.anime.trigger');
});
