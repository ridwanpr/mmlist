<?php

namespace App\Http\Controllers;

use App\Rules\Turnstile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render("Contact/Index");
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'nullable|email:dns|max:255',
            'content' => 'required|string|min:10',
            'cf-turnstile-response' => app()->environment('local') ? ['nullable'] : ['required', new Turnstile],
        ]);

        DB::table('contacts')->insert([
            'name'       => $validated['name'],
            'email'      => $validated['email'],
            'content'    => $validated['content'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return redirect()->back();
    }
}
