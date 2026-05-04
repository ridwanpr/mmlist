<?php

namespace App\Http\Controllers;

use App\DTOs\Auth\RegisterData;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function __construct(private AuthService $authService) {}

    public function register(): Response
    {
        return Inertia::render('Auth/Register');
    }

    public function registerAction(RegisterRequest $request): RedirectResponse
    {
        $dto = RegisterData::fromRequest($request);

        $this->authService->createNewUser($dto);

        return redirect()->route('auth.login');
    }

    public function login(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function loginAction(): void {}
}
