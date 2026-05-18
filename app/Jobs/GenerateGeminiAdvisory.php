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

        // 1. Calculate how many requests we are still allowed to make today
        $remainingQuota = 480 - $dailyRequests;

        if ($remainingQuota <= 0) {
            return;
        }

        // 2. Limit to either 15 (our max per minute) or the remaining daily quota
        $limit = min(15, $remainingQuota);

        // 3. Fetch up to 15 anime instead of just ->first()
        $animes = Anime::whereNull('ai_advisory')
            ->where('source', '!=', 'Original')
            ->where('rating', '!=', 'Rx - Hentai')
            ->orderByRaw("type = 'TV' DESC")
            ->orderBy('year', 'desc')
            ->orderBy('airing', 'desc')
            ->orderBy('score', 'desc')
            ->orderBy('id')
            ->limit($limit)
            ->get();

        if ($animes->isEmpty()) {
            return;
        }

        $processedCount = 0;

        foreach ($animes as $anime) {
            try {
                $advisory = $geminiService->generateAnimeAdvisory($anime->title, $anime->rating);

                if ($advisory != "Insufficient data to provide a reliable advisory.") {
                    $anime->update([
                        'ai_advisory' => $advisory
                    ]);
                }

                $processedCount++;

                sleep(4);
            } catch (\Exception $e) {
                Log::error("Gemini Advisory Failed for Anime ID {$anime->id}: " . $e->getMessage());
                $anime->update([
                    'ai_advisory' => 'AI Advisory not yet generated'
                ]);
            }
        }

        // 5. Bulk update the cache once at the end of the loop
        Cache::put($cacheKey, $dailyRequests + $processedCount, now()->addHours(24));
    }
}
