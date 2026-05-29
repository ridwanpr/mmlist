<?php

namespace App\Providers;

use App\Models\Anime;
use App\Models\TriggerContent;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('auth', function (Request $request) {
            return Limit::perMinute(7)->by($request->ip());
        });

        Relation::enforceMorphMap([
            'anime' => Anime::class,
            'trigger_content' => TriggerContent::class,
        ]);

        RateLimiter::for('jikan', function (object $job) {
            return [
                Limit::perMinute(60),
                Limit::perSecond(3),
            ];
        });
    }
}
