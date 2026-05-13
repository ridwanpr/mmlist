<?php

namespace App\Services;

use App\Utils\ImageProxy;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ImageProxyService
{
    public function stream(string $hash): StreamedResponse
    {
        $url = ImageProxy::decode($hash);

        if (! $url) {
            abort(403);
        }

        $this->assertAllowedUrl($url);

        $response = Http::withHeaders([
            'Accept' => 'image/*',
        ])
            ->timeout(config('image-proxy.timeout'))
            ->withOptions([
                'stream' => true,
            ])
            ->get($url);

        if (! $response->successful()) {
            abort(404);
        }

        $contentType = strtolower(
            $response->header('Content-Type')
        );

        if (! str_starts_with($contentType, 'image/')) {
            abort(415);
        }

        $contentLength = (int) $response->header('Content-Length');

        if (
            $contentLength > 0 &&
            $contentLength > config('image-proxy.max_bytes')
        ) {
            abort(413);
        }

        return response()->stream(
            function () use ($response) {

                $body = $response
                    ->toPsrResponse()
                    ->getBody();

                while (! $body->eof()) {
                    echo $body->read(8192);
                }
            },
            200,
            [
                'Content-Type' => $contentType,
                // Cloudflare CDN Cache
                'Cache-Control' => 'public, max-age=31536000, immutable',
                // Browser Cache
                'Expires' => gmdate(
                    'D, d M Y H:i:s',
                    time() + 31536000
                ).' GMT',
                // Extra CDN Hint
                'CDN-Cache-Control' => 'public, max-age=31536000',
                'X-Content-Type-Options' => 'nosniff',
            ]
        );
    }

    protected function assertAllowedUrl(string $url): void
    {
        $parts = parse_url($url);

        $scheme = $parts['scheme'] ?? null;
        $host = $parts['host'] ?? null;

        if (! in_array($scheme, ['http', 'https'], true)) {
            abort(422);
        }

        if (! in_array(
            $host,
            config('image-proxy.allowed_hosts'),
            true
        )) {
            abort(403);
        }
    }
}
