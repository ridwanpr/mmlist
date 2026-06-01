<?php

use App\Providers\AppServiceProvider;
use App\Providers\TypeScriptTransformerServiceProvider;

return [
    AppServiceProvider::class,
    TypeScriptTransformerServiceProvider::class,
    \SocialiteProviders\Manager\ServiceProvider::class,
];
