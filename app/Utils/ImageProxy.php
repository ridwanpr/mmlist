<?php

namespace App\Utils;

class ImageProxy
{
    public static function encode(string $url): string
    {
        return rtrim(strtr(base64_encode($url), '+/', '-_'), '=');
    }

    public static function decode(string $hash): ?string
    {
        $url = base64_decode(strtr($hash, '-_', '+/'));

        return $url ?: null;
    }
}
