<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class ManageUserController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function index()
    {
        $users = $this->userService->getUserPaginate(15);

        return Inertia::render('Backend/User/Index', [
            'users' => $users,
        ]);
    }

    public function edit(int $userId)
    {
        $user = $this->userService->findUserById($userId);

        return Inertia::render('Backend/User/Edit', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, int $userId)
    {
        $validated = $request->validate([
            'username' => ['required', 'min:3', Rule::unique('users')->ignore($userId)],
            'name' => ['required'],
            'email' => ['nullable', 'email'],
            'birth_date' => ['nullable'],
            'is_banned' => ['nullable'],
        ]);

        $user = $this->userService->findUserById($userId);
        $this->userService->adminUpdateUser($validated, $user->id);

        Inertia::flash('success', 'Update success');

        return back();
    }

    public function triggerReset(Request $request, int $userId)
    {
        dd($userId);
    }
}
