<?php

namespace App\Http\Controllers;

use App\Services\ImageProxyService;

class ImageProxyController extends Controller
{
    public function show(
        string $hash,
        ImageProxyService $service
    ) {
        return $service->stream($hash);
    }
}
