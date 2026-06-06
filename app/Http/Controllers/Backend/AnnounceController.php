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
        $announcements = Announcement::latest()->get();
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
