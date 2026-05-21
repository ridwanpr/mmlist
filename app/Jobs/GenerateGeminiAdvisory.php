<?php

namespace App\Jobs;

use App\Models\Anime;
use App\Models\TriggerContent;
use App\Models\AnimeTriggerContext;
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
        $remainingQuota = 800 - $dailyRequests;

        if ($remainingQuota <= 0) {
            return;
        }

        // 2. Limit to either 15 (our max per minute) or the remaining daily quota
        $limit = min(15, $remainingQuota);

        // 3. Fetch up to 15 anime missing an AI summary
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

        // Fetch all possible trigger content values from the database to map back against names
        $dbTriggerContents = TriggerContent::pluck('id', 'name')->toArray();
        $availableTriggerNames = array_keys($dbTriggerContents);

        $processedCount = 0;

        foreach ($animes as $anime) {
            try {
                // Returns clean structured data array separating general overview and specific triggers
                $result = $geminiService->generateAnimeAdvisory($anime->title, $availableTriggerNames, $anime->rating);

                // Save advisory regardless — if AI returned the fallback string, we still persist it
                // so whereNull() skips this anime on future runs and we don't waste tokens retrying it
                $anime->update([
                    'ai_advisory' => $result['ai_advisory'],
                ]);

                // Only process trigger contexts when the advisory is a real generated result,
                // not the fallback placeholder meaning the anime was unrecognized
                if ($result['ai_advisory'] !== GeminiService::FALLBACK_ADVISORY) {
                    foreach ($result['matched_triggers'] as $matched) {
                        $name = $matched['trigger_name'] ?? '';
                        $summary = $matched['ai_summary'] ?? '';

                        // Safeguard validation verifying the generated category matches an ID in your db
                        if (array_key_exists($name, $dbTriggerContents) && ! empty($summary)) {
                            AnimeTriggerContext::updateOrCreate(
                                [
                                    'anime_id' => $anime->id,
                                    'trigger_content_id' => $dbTriggerContents[$name],
                                ],
                                [
                                    'ai_summary' => $summary,
                                ]
                            );
                        }
                    }
                }

                $processedCount++;
                sleep(2);
            } catch (\Exception $e) {
                // API completely failed after all fallbacks — stamp the placeholder so this anime
                Log::error("Gemini Advisory Processing Failed for Anime ID {$anime->id}: " . $e->getMessage());
                $anime->update([
                    'ai_advisory' => GeminiService::FALLBACK_ADVISORY,
                ]);
            }
        }

        // 4. Bulk update the daily cache tracker threshold count once
        Cache::put($cacheKey, $dailyRequests + $processedCount, now()->addHours(24));
    }
}
