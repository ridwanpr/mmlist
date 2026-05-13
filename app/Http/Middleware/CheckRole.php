<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        if (! Auth::check()) {
            return redirect()->route('login');
        }

        $userRole = DB::table('user_roles')
            ->where('user_id', Auth::id())
            ->value('role_id');

        if ($userRole !== $role) {
            return back(fallback: route('home.index'));
        }
        
        return $next($request);
    }
}
