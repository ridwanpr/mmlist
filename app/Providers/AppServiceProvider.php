<?php

namespace App\Providers;

use App\Models\Anime;
use App\Models\TriggerContent;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Event;
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

        Event::listen(function (\SocialiteProviders\Manager\SocialiteWasCalled $event) {
            $event->extendSocialite('google', \SocialiteProviders\Google\Provider::class);
        });
    }
}
