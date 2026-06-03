<?php

namespace App\Jobs;

use App\Models\Anime;
use App\Models\AnimeTriggerContext;
use App\Models\TriggerContent;
use App\Services\GeminiService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class GenerateGeminiAdvisory implements ShouldQueue
{
    use Queueable;

    public function __construct()
    {
        $this->queue = 'gemini';
    }

    public function handle(GeminiService $geminiService): void
    {
        // Enforce daily API limits
        $cacheKey = 'gemini_daily_requests_' . date('Y-m-d');
        $dailyRequests = Cache::get($cacheKey, 0);
        $remainingQuota = 500 - $dailyRequests;

        Log::channel('gemini')->info("GenerateGeminiAdvisory: Job started. Daily requests tracked: {$dailyRequests}. Remaining quota: {$remainingQuota}.");

        if ($remainingQuota <= 0) {
            Log::channel('gemini')->warning('GenerateGeminiAdvisory: Aborting job execution. Daily quota limit reached.');
            return;
        }

        // Cap batch size to remaining quota or maximum of 15 items per run
        $maxBatch = min(15, $remainingQuota);

        // Divide batch: reserve slots for Phase 2 fresh items if batch size allows
        $phase1Cap = $maxBatch > 5 ? $maxBatch - 5 : (int) floor($maxBatch / 2);
        $currentYear = (int) date('Y');

        // Map database trigger names to their primary IDs
        $dbTriggerContents = TriggerContent::pluck('id', 'name')->toArray();
        $availableTriggerNames = array_keys($dbTriggerContents);
        $totalTriggerCount = count($dbTriggerContents);

        Log::channel('gemini')->info("GenerateGeminiAdvisory: Reference data loaded. Total target triggers in DB: {$totalTriggerCount}. Total Max Batch: {$maxBatch}. Phase 1 Cap: {$phase1Cap}. Target max year: {$currentYear}");

        $processedCount = 0;

        // -------------------------------------------------------------------------
        // Phase 1: Gap-fill existing advisories missing new trigger mappings
        // -------------------------------------------------------------------------
        $gapAnimes = Anime::whereNotNull('ai_advisory')
            ->where('ai_advisory', '!=', GeminiService::FALLBACK_ADVISORY)
            ->where('source', '!=', 'Original')
            ->where('rating', '!=', 'Rx - Hentai')
            ->where('animes.year', '<=', $currentYear)
            ->whereRaw(
                '(SELECT COUNT(*) FROM anime_trigger_contexts WHERE anime_trigger_contexts.anime_id = animes.id) < ?',
                [$totalTriggerCount]
            )
            ->orderBy('animes.score', 'desc')
            ->orderBy('animes.year', 'desc')
            ->orderBy('animes.airing', 'desc')
            ->limit($phase1Cap)
            ->get();

        Log::channel('gemini')->info('GenerateGeminiAdvisory: Phase 1 (Gap-fill) found ' . $gapAnimes->count() . ' candidates.');

        foreach ($gapAnimes as $anime) {
            if ($processedCount >= $phase1Cap) {
                Log::channel('gemini')->info("GenerateGeminiAdvisory: Allocated Phase 1 limit of {$phase1Cap} reached.");
                break;
            }

            // Find triggers already recorded for this anime
            $existingTriggerIds = AnimeTriggerContext::where('anime_id', $anime->id)
                ->pluck('trigger_content_id')
                ->flip()
                ->all();

            // Isolate only the missing trigger names to send to the API
            $missingTriggerNames = array_keys(
                array_filter($dbTriggerContents, fn($id) => ! isset($existingTriggerIds[$id]))
            );

            Log::channel('gemini')->info("GenerateGeminiAdvisory: Phase 1 processing -> ID: {$anime->id} | Title: {$anime->title} | Missing Triggers Count: " . count($missingTriggerNames));

            if (empty($missingTriggerNames)) {
                Log::channel('gemini')->info("GenerateGeminiAdvisory: Skipping Anime ID {$anime->id}. Discrepancy resolved by concurrent run.");
                continue;
            }

            try {
                $result = $geminiService->generateAnimeAdvisory($anime->title, $missingTriggerNames, $anime->rating);

                if ($result['ai_advisory'] !== GeminiService::FALLBACK_ADVISORY) {
                    $this->syncTriggerContexts($anime->id, $result['matched_triggers'], $dbTriggerContents, $missingTriggerNames);
                }

                $processedCount++;
                sleep(2);
            } catch (\Exception $e) {
                // Abort entire job if the fallback infrastructure chain completely fails
                Log::channel('gemini')->critical("GenerateGeminiAdvisory: Infrastructure chain failed in Phase 1 for Anime ID {$anime->id}. Aborting job.");
                Cache::put($cacheKey, $dailyRequests + $processedCount, now()->addHours(24));
                return;
            }
        }

        // -------------------------------------------------------------------------
        // Phase 2: Process completely fresh anime records
        // -------------------------------------------------------------------------
        $remainingSlots = $maxBatch - $processedCount;
        Log::channel('gemini')->info("GenerateGeminiAdvisory: Phase 1 complete. Processed: {$processedCount}. Remaining slots for Phase 2: {$remainingSlots}.");

        if ($remainingSlots <= 0) {
            Cache::put($cacheKey, $dailyRequests + $processedCount, now()->addHours(24));
            Log::channel('gemini')->info('GenerateGeminiAdvisory: Job complete. No open slots remaining for Phase 2.');
            return;
        }

        $newAnimes = Anime::whereNull('ai_advisory')
            ->where('source', '!=', 'Original')
            ->where('rating', '!=', 'Rx - Hentai')
            ->where('animes.year', '<=', $currentYear)
            ->orderBy('animes.score', 'desc')
            ->orderBy('animes.year', 'desc')
            ->orderBy('animes.airing', 'desc')
            ->limit($remainingSlots)
            ->get();

        Log::channel('gemini')->info('GenerateGeminiAdvisory: Phase 2 (Fresh) found ' . $newAnimes->count() . ' candidates.');

        foreach ($newAnimes as $anime) {
            if ($processedCount >= $maxBatch) {
                Log::channel('gemini')->info("GenerateGeminiAdvisory: Total batch limit of {$maxBatch} reached during Phase 2.");
                break;
            }

            Log::channel('gemini')->info("GenerateGeminiAdvisory: Phase 2 processing -> ID: {$anime->id} | Title: {$anime->title}");

            try {
                $result = $geminiService->generateAnimeAdvisory($anime->title, $availableTriggerNames, $anime->rating);

                $anime->update(['ai_advisory' => $result['ai_advisory']]);

                if ($result['ai_advisory'] !== GeminiService::FALLBACK_ADVISORY) {
                    $this->syncTriggerContexts($anime->id, $result['matched_triggers'], $dbTriggerContents, $availableTriggerNames);
                }

                $processedCount++;
                sleep(2);
            } catch (\Exception $e) {
                // Abort job and flag current item with fallback state if entire infrastructure fails
                Log::channel('gemini')->critical("GenerateGeminiAdvisory: Infrastructure chain failed in Phase 2 for Anime ID {$anime->id}. Aborting job.");
                $anime->update(['ai_advisory' => GeminiService::FALLBACK_ADVISORY]);
                Cache::put($cacheKey, $dailyRequests + $processedCount, now()->addHours(24));
                return;
            }
        }

        Cache::put($cacheKey, $dailyRequests + $processedCount, now()->addHours(24));
        Log::channel('gemini')->info("GenerateGeminiAdvisory: Job processing window finalized. Total items handled in this run: {$processedCount}.");
    }

    private function syncTriggerContexts(int $animeId, array $matchedTriggers, array $dbTriggerContents, array $evaluatedTriggerNames): void
    {
        // Key summaries by trigger name for fast array lookups
        $matchedMap = [];
        foreach ($matchedTriggers as $matched) {
            $name = $matched['trigger_name'] ?? '';
            $summary = $matched['ai_summary'] ?? '';
            if (! empty($name) && ! empty($summary)) {
                $matchedMap[$name] = $summary;
            }
        }

        // Loop through all evaluated triggers and insert summaries or static fallbacks
        $insertedCount = 0;
        foreach ($evaluatedTriggerNames as $name) {
            if (array_key_exists($name, $dbTriggerContents)) {
                $summary = $matchedMap[$name] ?? GeminiService::FALLBACK_CONTEXT;

                AnimeTriggerContext::updateOrCreate(
                    [
                        'anime_id' => $animeId,
                        'trigger_content_id' => $dbTriggerContents[$name],
                    ],
                    ['ai_summary' => $summary]
                );
                $insertedCount++;
            }
        }

        Log::channel('gemini')->info("GenerateGeminiAdvisory: Synced trigger contexts for Anime ID {$animeId}. Populated {$insertedCount} total context rows.");
    }
}
