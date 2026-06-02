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

        Inertia::flash('success', 'Register success, now you can login');

        return redirect()->route('login');
    }

    public function login(): Response
    {
        if (! session()->has('url.intended')) {
            session(['url.intended' => url()->previous()]);
        }

        return Inertia::render('Auth/Login');
    }

    public function loginAction(LoginRequest $request): RedirectResponse
    {
        $dto = LoginData::fromRequest($request);

        if ($this->authService->authenticate($dto)) {
            $request->session()->regenerate();

            cookie()->queue('mamoru_is_logged_in', '1', config('session.lifetime'), '/', null, false, false);

            Inertia::flash('success', 'Login success, welcome');

            $userRole = $this->authService->getAuthenticatedUserRole();

            if ($userRole === 'admin') {
                return redirect()->route('dashboard.index');
            }

            return redirect()->intended(route('user.dash.index'));
        }

        Inertia::flash('error', 'Login failed, invalid credentials');

        return back();
    }

    public function logout(Request $request): RedirectResponse
    {
        $this->authService->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        cookie()->queue(cookie()->forget('mamoru_is_logged_in'));

        Inertia::clearHistory();

        return redirect()->route('home.index');
    }
}
