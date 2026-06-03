<?php

use App\Http\Middleware\AddCacheControlHeaders;
use App\Http\Middleware\CheckBannedUser;
use App\Http\Middleware\CheckRole;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Sentry\Laravel\Integration;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Inertia\Inertia;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->trustProxies(at: '*');
        $middleware->throttleWithRedis();
        $middleware->web(append: [
            HandleInertiaRequests::class,
            CheckBannedUser::class,
            AddCacheControlHeaders::class,
        ]);
        $middleware->alias([
            'role' => CheckRole::class,
        ]);
        $middleware->redirectGuestsTo(fn() => route('login'));
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        Integration::handles($exceptions);

        $exceptions->respond(function (Response $response, Throwable $exception, Request $request) {
            $statusCodes = [403, 404, 500, 503];

            if (!app()->environment('local') && in_array($response->getStatusCode(), $statusCodes)) {
                return Inertia::render('Error', [
                    'status' => $response->getStatusCode()
                ]);
            }

            return $response;
        });
    })->create();
