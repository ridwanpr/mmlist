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

        // Serve from cache immediately if both files are intact
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

        $url = ImageProxy::decode($hash);

        if (! $url) {
            Log::warning('Image proxy 403: Unable to decode hash string.', [
                'hash' => $hash,
            ]);
            abort(403);
        }

        $this->assertAllowedUrl($url, $hash);

        $response = Http::withHeaders([
            'Accept' => 'image/*',
        ])
            ->timeout(config('image-proxy.timeout'))
            ->withOptions([
                'stream' => true, // Keep memory low by processing chunks reactively
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

        $contentType = strtolower($response->header('Content-Type'));

        if (! str_starts_with($contentType, 'image/')) {
            Log::warning('Image proxy 415: Remote resource content type is not an image.', [
                'hash' => $hash,
                'url' => $url,
                'content_type' => $contentType,
            ]);
            abort(415);
        }

        $contentLength = (int) $response->header('Content-Length');

        if ($contentLength > 0 && $contentLength > config('image-proxy.max_bytes')) {
            Log::warning('Image proxy 413: Remote image file size exceeds configured limits.', [
                'hash' => $hash,
                'url' => $url,
                'size_bytes' => $contentLength,
                'max_allowed_bytes' => config('image-proxy.max_bytes'),
            ]);
            abort(413);
        }

        return response()->stream(
            function () use ($disk, $cachePath, $metaPath, $response, $contentType) {
                $disk->makeDirectory('image_proxy');

                $tmpPath = "{$cachePath}.tmp";
                $absoluteTmpPath = $disk->path($tmpPath);

                // Suppress errors to catch directory or write blocks cleanly without throwing 500s
                $localFile = @fopen($absoluteTmpPath, 'wb');
                $remoteBody = $response->toPsrResponse()->getBody();

                if (! $localFile) {
                    // Fail open: pass the image through even if storage isn't writable
                    while (! $remoteBody->eof()) {
                        echo $remoteBody->read(8192);
                    }

                    return;
                }

                try {
                    while (! $remoteBody->eof()) {
                        $chunk = $remoteBody->read(8192);
                        fwrite($localFile, $chunk);
                        echo $chunk;

                        // Explicitly flush buffers so Valet/Herd web servers pass chunks to the browser immediately
                        if (ob_get_level() > 0) {
                            ob_flush();
                        }
                        flush();

                        if (connection_aborted()) {
                            break;
                        }
                    }

                    $isComplete = $remoteBody->eof();
                } finally {
                    fclose($localFile);

                    // Only save to production path if the file finished transferring intact
                    if (isset($isComplete) && $isComplete) {
                        $disk->move($tmpPath, $cachePath);
                        $disk->put($metaPath, $contentType);
                    } else {
                        $disk->delete($tmpPath);
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
            'Expires' => gmdate('D, d M Y H:i:s', time() + 31536000).' GMT',
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

        if (! in_array($host, config('image-proxy.allowed_hosts'), true)) {
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
