<?php

namespace App\Jobs;

use App\Models\Anime;
use App\Services\GeminiService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GenerateGeminiAdvisory implements ShouldQueue
{
    use Queueable;

    public function __construct() {}

    /**
     * Execute the job.
     */
    public function handle(GeminiService $geminiService): void
    {
        $cacheKey = 'gemini_daily_requests_' . date('Y-m-d');

        $dailyRequests = Cache::get($cacheKey, 0);

        if ($dailyRequests >= 480) {
            return;
        }

        $anime = Anime::whereNull('ai_advisory')
            ->where('source', '!=', 'Original')
            ->where('rating', '!=', 'Rx - Hentai')
            ->orderByRaw("type = 'TV' DESC")
            ->orderBy('year', 'desc')
            ->orderBy('airing', 'desc')
            ->orderBy('score', 'desc')
            ->orderBy('id')
            ->first();

        if (! $anime) {
            return;
        }

        try {
            $advisory = $geminiService->generateAnimeAdvisory($anime->title);

            $anime->update([
                'ai_advisory' => $advisory
            ]);

            // Increment the daily counter and store it for 24 hours
            Cache::put($cacheKey, $dailyRequests + 1, now()->addHours(24));
        } catch (\Exception $e) {
            Log::error("Gemini Advisory Failed for Anime ID {$anime->id}: " . $e->getMessage());
            $anime->update([
                'ai_advisory' => 'AI Advisary not yet generated'
            ]);
        }
    }
}
