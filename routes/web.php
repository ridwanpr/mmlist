<?php

use App\Http\Controllers\AnimeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BrowseController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home.index');
Route::get('browse', [BrowseController::class, 'index'])->name('browse.index');

Route::get('anime/show', [AnimeController::class, 'show'])->name('anime.show');

Route::get('register', [AuthController::class, 'register'])->name('auth.register');
Route::get('login', [AuthController::class, 'login'])->name('auth.login');
