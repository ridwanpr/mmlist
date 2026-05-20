<?php

namespace App\Services;

use App\Utils\ImageProxy;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ImageProxyService
{
    public function stream(string $hash): StreamedResponse
    {
        $disk = Storage::disk('local');
        $cachePath = "image_proxy/{$hash}.bin";
        $metaPath = "image_proxy/{$hash}.meta";

        // 1. Serve from local cache if it exists
        if ($disk->exists($cachePath) && $disk->exists($metaPath)) {
            $contentType = $disk->get($metaPath);

            return response()->stream(
                function () use ($disk, $cachePath) {
                    $stream = $disk->readStream($cachePath);
                    if ($stream) {
                        fpassthru($stream);
                        fclose($stream);
                    }
                },
                200,
                $this->getHeaders($contentType)
            );
        }

        // 2. Cache Miss: Decode and validate the URL
        $url = ImageProxy::decode($hash);

        if (! $url) {
            Log::warning('Image proxy 403: Unable to decode hash string.', [
                'hash' => $hash,
            ]);
            abort(403);
        }

        $this->assertAllowedUrl($url, $hash);

        // 3. Fetch the remote image
        $response = Http::withHeaders([
            'Accept' => 'image/*',
        ])
            ->timeout(config('image-proxy.timeout'))
            ->withOptions([
                'stream' => true,
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

        // 4. Save stream directly to local disk chunk-by-chunk
        $disk->makeDirectory('image_proxy');
        $absoluteCachePath = $disk->path($cachePath);

        $remoteBody = $response->toPsrResponse()->getBody();
        $localFile = fopen($absoluteCachePath, 'wb');

        if ($localFile) {
            while (! $remoteBody->eof()) {
                fwrite($localFile, $remoteBody->read(8192));
            }
            fclose($localFile);

            // Save content type metadata alongside the binary file
            $disk->put($metaPath, $contentType);
        }

        // 5. Stream the freshly cached file to the user
        return response()->stream(
            function () use ($disk, $cachePath) {
                $stream = $disk->readStream($cachePath);
                if ($stream) {
                    fpassthru($stream);
                    fclose($stream);
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
