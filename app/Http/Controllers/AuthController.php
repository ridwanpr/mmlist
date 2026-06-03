<?php

namespace App\Http\Controllers;

use App\DTOs\LoginData;
use App\DTOs\RegisterData;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\RegisterRequest;
use App\Jobs\SendMail;
use App\Models\User;
use App\Rules\Turnstile;
use App\Services\AuthService;
use App\Services\UserService;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Password;

class AuthController extends Controller
{
    public function __construct(
        private AuthService $authService,
        private UserService $userService
    ) {}

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

    public function requestPassword()
    {
        return Inertia::render('Auth/RequestPassword');
    }

    public function requestPasswordAction(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'cf-turnstile-response' => app()->environment('local') ? ['nullable'] : ['required', new Turnstile],
        ]);

        $user = $this->userService->findUserByEmail($validated['email']);

        if (!$user) {
            Inertia::flash('success', 'We have emailed your password reset link.');
            return back();
        }

        $token = Password::broker()->createToken($user);
        $resetUrl = route('reset-password.index', ['token' => $token, 'email' => $user->email]);

        $htmlContent = "
            <div style='font-family: sans-serif; padding: 20px; color: #333;'>
                <h2>Reset Your Password</h2>
                <p>Hello {$user->name},</p>
                <p>You received this email because a password reset request was made for your account.</p>
                <div style='margin: 24px 0;'>
                    <a href='{$resetUrl}' style='background-color: #0052cc; color: white; padding: 10px 20px; text-decoration: none; border-radius: 6px; font-weight: bold;'>Reset Password</a>
                </div>
                <p>This link will expire in " . config('auth.passwords.users.expire', 60) . " minutes.</p>
                <p>If you did not make this request, you can safely ignore this email.</p>
            </div>
        ";

        SendMail::dispatch(
            $user->email,
            $user->name,
            'Reset Password Verification',
            $htmlContent
        );

        Inertia::flash('success', 'We have emailed your password reset link.');

        return back();
    }

    public function resetPassword(string $token, Request $request)
    {
        return Inertia::render('Auth/ResetPassword', [
            'token' => $token,
            'email' => $request->email,
        ]);
    }

    public function resetPasswordAction(Request $request): RedirectResponse
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email:dns',
            'password' => 'required|min:6|confirmed',
        ]);

        $status = Password::broker()->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(\Str::random(60));

                $user->save();

                event(new PasswordReset($user));
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            Inertia::flash('success', __($status));
            return redirect()->route('login');
        }

        Inertia::flash('error', __($status));
        return back();
    }
}
