<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateProfileRequest;
use App\Services\UserService;

class UserProfileController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function update(UpdateProfileRequest $request) {}
}
