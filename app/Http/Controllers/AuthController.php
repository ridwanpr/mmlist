<?php

namespace App\Http\Controllers;

use App\DTOs\LoginData;
use App\DTOs\RegisterData;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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

        return redirect()->route('login');
    }

    public function login(): Response
    {
        return Inertia::render('Auth/Login');
    }

    public function loginAction(LoginRequest $request): RedirectResponse
    {
        $dto = LoginData::fromRequest($request);

        if ($this->authService->authenticate($dto)) {
            $request->session()->regenerate();

            return redirect()->intended('/dashboard');
        }

        return back();
    }

    public function logout(Request $request): RedirectResponse
    {
        $this->authService->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('home.index');
    }
}
