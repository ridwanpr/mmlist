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

    public function __construct() {}

    public function handle(GeminiService $geminiService): void
    {
        $cacheKey = 'gemini_daily_requests_' . date('Y-m-d');
        $dailyRequests = Cache::get($cacheKey, 0);
        $remainingQuota = 800 - $dailyRequests;

        Log::info("GenerateGeminiAdvisory: Job started. Daily requests tracked: {$dailyRequests}. Remaining quota: {$remainingQuota}.");

        if ($remainingQuota <= 0) {
            Log::warning('GenerateGeminiAdvisory: Aborting job execution. Daily quota limit reached.');

            return;
        }

        // Define total maximum items per single job run
        $maxBatch = min(15, $remainingQuota);

        // Allocate explicit boundaries to guarantee Phase 2 runs.
        // If a full batch is available, Phase 1 is capped at 10, leaving 5 slots for Phase 2.
        // If quota is low (under 5), slots are divided evenly.
        $phase1Cap = $maxBatch > 5 ? $maxBatch - 5 : (int) floor($maxBatch / 2);

        $currentYear = (int) date('Y');

        $dbTriggerContents = TriggerContent::pluck('id', 'name')->toArray();
        $availableTriggerNames = array_keys($dbTriggerContents);
        $totalTriggerCount = count($dbTriggerContents);

        Log::info("GenerateGeminiAdvisory: Reference data loaded. Total target triggers in DB: {$totalTriggerCount}. Total Max Batch: {$maxBatch}. Phase 1 Cap: {$phase1Cap}. Target max year: {$currentYear}");

        $processedCount = 0;

        // -------------------------------------------------------------------------
        // Phase 1: Gap-fill (Prioritized) : Capped to reserve slots for Phase 2
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

        Log::info('GenerateGeminiAdvisory: Phase 1 (Gap-fill) found ' . $gapAnimes->count() . ' candidates matching discrepancy criteria.');

        foreach ($gapAnimes as $anime) {
            if ($processedCount >= $phase1Cap) {
                Log::info("GenerateGeminiAdvisory: Allocated Phase 1 limit of {$phase1Cap} reached.");
                break;
            }

            $existingTriggerIds = AnimeTriggerContext::where('anime_id', $anime->id)
                ->pluck('trigger_content_id')
                ->flip()
                ->all();

            $missingTriggerNames = array_keys(
                array_filter($dbTriggerContents, fn($id) => ! isset($existingTriggerIds[$id]))
            );

            Log::info("GenerateGeminiAdvisory: Phase 1 processing -> ID: {$anime->id} | Title: {$anime->title} | Type: {$anime->type} | Year: {$anime->year} | Current Context Count: " . count($existingTriggerIds) . " / {$totalTriggerCount} | Missing Triggers Count: " . count($missingTriggerNames));

            if (empty($missingTriggerNames)) {
                Log::info("GenerateGeminiAdvisory: Skipping Anime ID {$anime->id}. Discrepancy resolved dynamically via concurrent process.");

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
                Log::error("GenerateGeminiAdvisory: Phase 1 gap-fill failed for Anime ID {$anime->id}: " . $e->getMessage());
            }
        }

        // -------------------------------------------------------------------------
        // Phase 2: Fresh anime (Guaranteed to have remaining slots from the total batch)
        // -------------------------------------------------------------------------
        $remainingSlots = $maxBatch - $processedCount;
        Log::info("GenerateGeminiAdvisory: Phase 1 complete. Processed: {$processedCount}. Remaining slots for Phase 2: {$remainingSlots}.");

        if ($remainingSlots <= 0) {
            Cache::put($cacheKey, $dailyRequests + $processedCount, now()->addHours(24));
            Log::info('GenerateGeminiAdvisory: Job complete. No open slots remaining for Phase 2 fresh anime processing.');

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

        Log::info('GenerateGeminiAdvisory: Phase 2 (Fresh) found ' . $newAnimes->count() . ' eligible candidates.');

        foreach ($newAnimes as $anime) {
            if ($processedCount >= $maxBatch) {
                Log::info("GenerateGeminiAdvisory: Total batch limit of {$maxBatch} reached during Phase 2.");
                break;
            }

            Log::info("GenerateGeminiAdvisory: Phase 2 processing -> ID: {$anime->id} | Title: {$anime->title} | Type: {$anime->type} | Year: {$anime->year} | Airing: {$anime->airing} | Score: {$anime->score}");

            try {
                $result = $geminiService->generateAnimeAdvisory($anime->title, $availableTriggerNames, $anime->rating);

                $anime->update(['ai_advisory' => $result['ai_advisory']]);

                if ($result['ai_advisory'] !== GeminiService::FALLBACK_ADVISORY) {
                    $this->syncTriggerContexts($anime->id, $result['matched_triggers'], $dbTriggerContents, $availableTriggerNames);
                }

                $processedCount++;
                sleep(2);
            } catch (\Exception $e) {
                Log::error("GenerateGeminiAdvisory: Phase 2 failed for Anime ID {$anime->id}: " . $e->getMessage());
                $anime->update(['ai_advisory' => GeminiService::FALLBACK_ADVISORY]);
            }
        }

        Cache::put($cacheKey, $dailyRequests + $processedCount, now()->addHours(24));
        Log::info("GenerateGeminiAdvisory: Job processing window finalized. Total items handled in this run: {$processedCount}.");
    }

    private function syncTriggerContexts(int $animeId, array $matchedTriggers, array $dbTriggerContents, array $evaluatedTriggerNames): void
    {
        $matchedMap = [];
        foreach ($matchedTriggers as $matched) {
            $name = $matched['trigger_name'] ?? '';
            $summary = $matched['ai_summary'] ?? '';
            if (! empty($name) && ! empty($summary)) {
                $matchedMap[$name] = $summary;
            }
        }

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

        Log::info("GenerateGeminiAdvisory: Synced trigger contexts for Anime ID {$animeId}. Populated {$insertedCount} total context rows.");
    }
}
