<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Exception;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class GoogleController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();

            $user = User::firstOrNew([
                'email' => $googleUser->getEmail(),
            ]);

            if (! $user->exists) {
                $emailPrefix = explode('@', $googleUser->getEmail())[0];
                $baseUsername = Str::slug($emailPrefix, '');

                if (empty($baseUsername)) {
                    $baseUsername = 'user';
                }

                $username = $baseUsername;
                $counter = 1;
                while (User::where('username', $username)->exists()) {
                    $username = $baseUsername . $counter;
                    $counter++;
                }

                $user->username = $username;
            }

            $user->name = $googleUser->getName();
            $user->email = $googleUser->getEmail();
            $user->google_id = $googleUser->getId();

            $user->save();

            $user->roles()->syncWithoutDetaching(['user']);

            Auth::login($user);

            Inertia::flash('success', 'Login success, welcome');

            return redirect()->intended(route('user.dash.index'));
        } catch (Exception $e) {
            Log::error('Google OAuth authentication process failed.', [
                'exception' => $e,
            ]);

            Inertia::flash('error', 'Unable to sign in with Google. Please try again.');

            return redirect('/login');
        }
    }
}
