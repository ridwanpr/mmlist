<?php

namespace App\Utils;

use Illuminate\Support\Str;

class GenerateSlug
{
    public static function generate(string $title, int $malId): string
    {
        // Convert the numeric ID to short alphanumeric string
        $shortId = base_convert((string) $malId, 10, 36);
        // Generate the full slug from the title
        $baseSlug = Str::slug($title);
        // Limit the slug to 60 characters and remove any dangling hyphens
        $truncatedSlug = rtrim(substr($baseSlug, 0, 60), '-');
        // Append the unique short ID
        $finalSlug = $truncatedSlug . '-' . $shortId;
        return $finalSlug;
    }
}
