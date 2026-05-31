<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DiscussionListController extends Controller
{
    public function index()
    {
        return Inertia::render('DiscussionList/Index');
    }
}
