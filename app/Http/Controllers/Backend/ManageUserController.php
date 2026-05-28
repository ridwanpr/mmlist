<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ManageUserController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function index()
    {
        $users = $this->userService->getUserPaginate(15);

        return Inertia::render('Backend/User/Index', [
            'users' => $users
        ]);
    }
}
