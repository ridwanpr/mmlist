<?php

namespace App\Http\Controllers;

use App\Jobs\ProcessWatchlistImport;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class WatchlistImportController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'xml_file' => ['required', 'file', 'mimes:xml', 'max:10240'],
        ]);

        $path = $request->file('xml_file')->store('watchlist-imports');

        if (!$path) {
            return back()->withErrors(['xml_file' => 'Failed to save uploaded file.']);
        }

        ProcessWatchlistImport::dispatch($path, Auth::user()->id);

        return back();
    }
}
