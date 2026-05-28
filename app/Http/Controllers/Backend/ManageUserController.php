<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;

class ManageUserController extends Controller
{
    public function __construct(private UserService $userService) {}

    public function index() {}
}
