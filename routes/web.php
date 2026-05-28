<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\ManageAnimeController;
use App\Http\Controllers\Backend\ManageUserController;
use App\Http\Controllers\BrowseController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentHistoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageProxyController;
use App\Http\Controllers\TriggerCommentController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\WatchlistController;
use Illuminate\Support\Facades\Route;
use Inertia\Middleware\EncryptHistory;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('browse', [BrowseController::class, 'index'])->name('browse.index');

Route::get('anime/{slug}', [AnimeController::class, 'show'])->name('anime.show');
Route::get('/asset/image/{hash}', [ImageProxyController::class, 'show'])->name('proxy.image');
Route::get('anime/discussion/{animeSlug}', [CommentController::class, 'getAnimeComment'])->name('comment.anime.index');
Route::get('anime/discussion/{animeslug}/{triggerContentSlug}', [TriggerCommentController::class, 'getTriggerComment'])
    ->name('comment.trigger.index');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::get('register', [AuthController::class, 'register'])->name('auth.register');

    Route::middleware('throttle:auth')->group(function () {
        Route::post('register', [AuthController::class, 'registerAction'])->name('auth.register.action');
        Route::post('login', [AuthController::class, 'loginAction'])->name('login.action');
    });
});

Route::prefix('admin')
    ->middleware(['auth', 'role:admin', EncryptHistory::class])
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
        Route::get('anime', [ManageAnimeController::class, 'index'])->name('manage-anime.index');

        Route::get('user', [ManageUserController::class, 'index'])->name('manage-user.index');
    });

Route::middleware(['auth', EncryptHistory::class])->group(function () {
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
    Route::put('comment/{commentId}', [CommentController::class, 'update'])->name('comment.update');
    Route::delete('comment/{commentId}', [CommentController::class, 'destroy'])->name('comment.destroy');
    Route::put('comment/upvote/{commentId}', [CommentController::class, 'upvote'])->name('comment.upvote');

    Route::post('trigger-comment', [TriggerCommentController::class, 'store'])->name('trigger-comment.store');

    Route::get('settings', [UserDashboardController::class, 'settingIndex'])->name('user-setting.index');
    Route::put('profile/{username}', [UserProfileController::class, 'update'])->name('profile.update');

    Route::get('comment-history', [CommentHistoryController::class, 'index'])->name('comment-history.index');
});
