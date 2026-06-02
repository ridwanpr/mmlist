<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\Auth\GoogleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Backend\ContactMessageController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\ManageAnimeController;
use App\Http\Controllers\Backend\ManageCommentController;
use App\Http\Controllers\Backend\ManageUserController;
use App\Http\Controllers\BrowseController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentHistoryController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ImageProxyController;
use App\Http\Controllers\LegalController;
use App\Http\Controllers\TriggerCommentController;
use App\Http\Controllers\UserDashboardController;
use App\Http\Controllers\UserProfileController;
use App\Http\Controllers\VoteController;
use App\Http\Controllers\WatchlistController;
use App\Http\Controllers\WatchlistImportController;
use Illuminate\Support\Facades\Route;
use Inertia\Middleware\EncryptHistory;

Route::get('/auth/google/redirect', [GoogleController::class, 'redirect'])->name('google.redirect');
Route::get('/auth/google/callback', [GoogleController::class, 'callback'])->name('google.callback');

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('browse', [BrowseController::class, 'index'])->name('browse.index');

Route::get('anime/{slug}', [AnimeController::class, 'show'])->name('anime.show');
Route::get('/asset/image/{hash}', [ImageProxyController::class, 'show'])->name('proxy.image');
Route::get('anime/discussion/{animeSlug}', [CommentController::class, 'getAnimeComment'])->name('comment.anime.index');
Route::get('anime/discussion/{animeslug}/{triggerContentSlug}', [TriggerCommentController::class, 'getTriggerComment'])
    ->name('comment.trigger.index');

Route::get('community', [CommunityController::class, 'index'])->name('community.index');

Route::get('contact', [ContactController::class, 'index'])->name('contact.index');
Route::post('contact', [ContactController::class, 'store'])->name('contact.store');

Route::get('privacy-policy', [LegalController::class, 'privacyPolicy'])->name('privacy-policy.index');
Route::get('terms', [LegalController::class, 'terms'])->name('terms.index');
Route::get('about', [LegalController::class, 'about'])->name('about.index');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthController::class, 'login'])->name('login');
    Route::get('register', [AuthController::class, 'register'])->name('auth.register');

    Route::post('register', [AuthController::class, 'registerAction'])->name('auth.register.action');
    Route::post('login', [AuthController::class, 'loginAction'])->name('login.action');

    Route::get('reset-password', [AuthController::class, 'resetPassword'])->name('reset-password.index');
});

// ADMIN ROUTE
Route::prefix('admin')
    ->middleware(['auth', 'role:admin', EncryptHistory::class])
    ->group(function () {
        Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard.index');
        Route::get('anime', [ManageAnimeController::class, 'index'])->name('manage-anime.index');

        Route::get('user', [ManageUserController::class, 'index'])->name('manage-user.index');
        Route::get('user/{userId}', [ManageUserController::class, 'edit'])->name('manage-user.edit');
        Route::put('user/{userId}', [ManageUserController::class, 'update'])->name('manage-user.update');
        Route::post('user/{userId}', [ManageUserController::class, 'triggerReset'])->name('manage-user.reset');

        Route::get('comment', [ManageCommentController::class, 'index'])->name('manage-comment.index');
        Route::delete('comment/{id}', [ManageCommentController::class, 'destroy'])->name('manage-comment.delete');

        Route::get('contact-message', [ContactMessageController::class, 'index'])->name('contact-message.index');
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

    Route::post('/watchlist/import', [WatchlistImportController::class, 'store'])
        ->middleware(['auth'])
        ->name('watchlist.import');
});

Route::get('/speed-test', function () {
    return response()->json(['status' => 'ok']);
});
