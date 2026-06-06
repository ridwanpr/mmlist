<?php

namespace App\Http\Middleware;

use App\Models\Announcement;
use App\Services\CommentService;
use App\Services\WatchlistService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'routes' => [
                'home.index' => route('home.index'),
                'browse.index' => route('browse.index'),
                'auth.register' => route('auth.register'),
                'login' => route('login'),
                'user.dash.index' => route('user.dash.index'),
                'watchlist.store' => route('watchlist.store'),
            ],
            'latestAnnouncement' => function () use ($request) {
                $latest = Announcement::latest()->first(['id', 'title']);

                if (!$latest) {
                    return null;
                }

                // If the user's cookie matches this announcement ID, hide it
                if ($request->cookie('dismissed_announcement') == $latest->id) {
                    return null;
                }

                return $latest;
            },
            'turnstileSiteKey' => config('services.turnstile.key'),
            'turnstileEnabled' => !app()->environment('local'),
            'currentRoute' => optional($request->route())->getName(),
            'auth' => [
                'user' => $request->user() ? [
                    'id' => $request->user()->id,
                    'name' => $request->user()->name,
                    'username' => $request->user()->username,
                    'birth_date' => $request->user()->birth_date,
                    'show_nsfw' => $request->user()->show_nsfw,
                    'role_id' => DB::table('user_roles')
                        ->where('user_id', $request->user()->id)
                        ->value('role_id'),
                    'votes_count' => fn() => app(WatchlistService::class)->getTotalVoteCount($request->user()->id),
                    'joined_at' => $request->user()->created_at ? $request->user()->created_at->format('j M Y') : null,
                    'comments_count' => fn() => app(CommentService::class)->getUserCommentCount($request->user()->id),
                ] : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
        ];
    }
}
