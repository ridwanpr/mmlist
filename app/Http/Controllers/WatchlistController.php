<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWatchlistRequest;

class WatchlistController extends Controller
{
    public function store(StoreWatchlistRequest $request)
    {
        dd($request->all());
    }
}
