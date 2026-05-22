<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\ManageAnimeController;
use App\Http\Controllers\BrowseController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageProxyController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\WatchlistController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('browse', [BrowseController::class, 'index'])->name('browse.index');

Route::get('anime/{slug}', [AnimeController::class, 'show'])->name('anime.show');
Route::get('/asset/image/{hash}', [ImageProxyController::class, 'show'])->name('proxy.image');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::get('register', [AuthController::class, 'register'])->name('auth.register');

    Route::middleware('throttle:auth')->group(function () {
        Route::post('register', [AuthController::class, 'registerAction'])->name('auth.register.action');
        Route::post('login', [AuthController::class, 'loginAction'])->name('login.action');
    });
});

Route::prefix('admin')
    ->middleware(['auth', 'role:admin'])
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard.index');

        Route::get('anime', [ManageAnimeController::class, 'index'])->name('manage-anime.index');
    });

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('auth.logout');

    Route::get('dash', [UserDashboardController::class, 'index'])->name('user.dash.index');

    Route::post('vote-anime-trigger/{triggerContentId}/{animeSlug}', [VoteController::class, 'voteAnimeTrigger'])
        ->name('vote.anime.trigger');
    Route::get('votes', [VoteController::class, 'index'])->name('votes.index');

    Route::get('watchlist', [WatchlistController::class, 'index'])->name('watchlist.index');
    Route::post('watchlist', [WatchlistController::class, 'store'])->name('watchlist.store');
    Route::delete('watchlist/{watchlistId}', [WatchlistController::class, 'destroy'])->name('watchlist.destroy');
    Route::put('watchlist/{watchlistId}', [WatchlistController::class, 'update'])->name('watchlist.update');

    Route::post('comment', [CommentController::class, 'store'])->name('comment.store');
});
