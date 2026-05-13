<?php

namespace App\Http\Controllers;

use App\Services\ImageProxyService;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ImageProxyController extends Controller
{
    public function show(
        string $hash,
        ImageProxyService $service
    ): StreamedResponse {
        return $service->stream($hash);
    }
}
