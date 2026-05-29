<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Services\UserService;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;

class UserProfileController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function update(UpdateProfileRequest $request): RedirectResponse
    {
        $this->userService->updateUser(
            $request->user()->id,
            $request->validated()
        );

        Inertia::flash('success', 'Profile updated successfully.');

        return redirect()->back();
    }
}
