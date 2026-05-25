<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class TriggerCommentController extends Controller
{
    public function getTriggerComment()
    {
        return Inertia::render('TriggerComment/Index');
    }
}
