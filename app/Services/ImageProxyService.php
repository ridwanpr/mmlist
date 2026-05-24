<?php

namespace App\Services;

use App\Utils\ImageProxy;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ImageProxyService
{
    public function stream(string $hash): StreamedResponse
    {
        // 1. Decode and validate the incoming hash URL
        $url = ImageProxy::decode($hash);

        if (! $url) {
            Log::warning('Image proxy 403: Unable to decode hash string.', [
                'hash' => $hash,
            ]);
            abort(403);
        }

        $this->assertAllowedUrl($url, $hash);

        // 2. Fetch the remote image with a browser-spoofing User-Agent
        $response = Http::withHeaders([
            'Accept' => 'image/*',
            'User-Agent' => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 Mamorulist/1.0 (ImageProxy)',
        ])
            ->timeout(config('image-proxy.timeout'))
            ->withOptions([
                'stream' => true, // Keeps memory low by streaming the connection source
            ])
            ->get($url);

        if (! $response->successful()) {
            Log::warning('Image proxy 404: Remote server returned failure status code.', [
                'hash' => $hash,
                'url' => $url,
                'status' => $response->status(),
            ]);
            abort(404);
        }

        $contentType = strtolower(
            $response->header('Content-Type')
        );

        if (! str_starts_with($contentType, 'image/')) {
            Log::warning('Image proxy 415: Remote resource content type is not an image.', [
                'hash' => $hash,
                'url' => $url,
                'content_type' => $contentType,
            ]);
            abort(415);
        }

        $contentLength = (int) $response->header('Content-Length');

        if (
            $contentLength > 0 &&
            $contentLength > config('image-proxy.max_bytes')
        ) {
            Log::warning('Image proxy 413: Remote image file size exceeds configured limits.', [
                'hash' => $hash,
                'url' => $url,
                'size_bytes' => $contentLength,
                'max_allowed_bytes' => config('image-proxy.max_bytes'),
            ]);
            abort(413);
        }

        // 3. Stream the remote binary data straight to the user chunk-by-chunk
        return response()->stream(
            function () use ($response) {
                $remoteBody = $response->toPsrResponse()->getBody();

                while (! $remoteBody->eof()) {
                    echo $remoteBody->read(8192); // Read and output in 8KB chunks

                    // Terminate if client closes connection early
                    if (connection_aborted()) {
                        break;
                    }
                }
            },
            200,
            $this->getHeaders($contentType)
        );
    }

    /** @return array<string, string> */
    protected function getHeaders(string $contentType): array
    {
        return [
            'Content-Type' => $contentType,
            'Cache-Control' => 'public, max-age=31536000, immutable',
            'Expires' => gmdate(
                'D, d M Y H:i:s',
                time() + 31536000
            ) . ' GMT',
            'CDN-Cache-Control' => 'public, max-age=31536000',
            'X-Content-Type-Options' => 'nosniff',
        ];
    }

    protected function assertAllowedUrl(string $url, string $hash): void
    {
        $parts = parse_url($url);

        $scheme = $parts['scheme'] ?? null;
        $host = $parts['host'] ?? null;

        if (! in_array($scheme, ['http', 'https'], true)) {
            Log::warning('Image proxy 422: Invalid URL scheme protocol.', [
                'hash' => $hash,
                'url' => $url,
                'scheme' => $scheme,
            ]);
            abort(422);
        }

        if (! in_array(
            $host,
            config('image-proxy.allowed_hosts'),
            true
        )) {
            Log::warning('Image proxy 403: Decoded host is not present in the allowed hosts list.', [
                'hash' => $hash,
                'url' => $url,
                'host' => $host,
                'allowed_hosts' => config('image-proxy.allowed_hosts'),
            ]);
            abort(403);
        }
    }
}
