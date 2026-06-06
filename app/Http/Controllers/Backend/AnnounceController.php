<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use App\Models\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnnounceController extends Controller
{
    public function index()
    {
        $announcements = Announcement::latest()->get()->map(function ($announce) {
            return [
                'id' => $announce->id,
                'title' => $announce->title,
                'body' => $announce->body,
                'created_at' => $announce->created_at->format('M j, Y'),
            ];
        });

        return Inertia::render('Backend/Announce/Index', [
            'announcements' => $announcements
        ]);
    }

    public function create()
    {
        return Inertia::render('Backend/Announce/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
        ]);

        Announcement::create($validated);

        return redirect()->route('announce.index');
    }
}
