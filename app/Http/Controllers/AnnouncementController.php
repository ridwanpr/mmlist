<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Inertia\Inertia;

class AnnouncementController extends Controller
{
    public function show(Announcement $announcement)
    {
        return Inertia::render('Announcement/Show', [
            'announcement' => [
                'id' => $announcement->id,
                'title' => $announcement->title,
                'body' => $announcement->body,
                'created_at' => $announcement->created_at->format('M j, Y'),
            ]
        ]);
    }
}
