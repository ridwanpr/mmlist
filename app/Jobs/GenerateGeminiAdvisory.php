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

    public function handle(GeminiService $geminiService): void
    {
        $cacheKey = 'gemini_daily_requests_' . date('Y-m-d');
        $dailyRequests = Cache::get($cacheKey, 0);
        $remainingQuota = 800 - $dailyRequests;

        if ($remainingQuota <= 0) {
            return;
        }

        $limit = min(15, $remainingQuota);

        // name => id map, used in both phases
        $dbTriggerContents = TriggerContent::pluck('id', 'name')->toArray();
        $availableTriggerNames = array_keys($dbTriggerContents);
        $totalTriggerCount = count($dbTriggerContents);

        $processedCount = 0;

        // -------------------------------------------------------------------------
        // Phase 1: Fresh anime (no advisory yet)
        // -------------------------------------------------------------------------
        $newAnimes = Anime::whereNull('ai_advisory')
            ->where('source', '!=', 'Original')
            ->where('rating', '!=', 'Rx - Hentai')
            ->orderByRaw("animes.type = 'TV' DESC")
            ->orderBy('animes.year', 'desc')
            ->orderBy('animes.airing', 'desc')
            ->orderBy('animes.score', 'desc')
            ->limit($limit)
            ->get();

        foreach ($newAnimes as $anime) {
            if ($processedCount >= $limit) {
                break;
            }

            try {
                $result = $geminiService->generateAnimeAdvisory($anime->title, $availableTriggerNames, $anime->rating);

                $anime->update(['ai_advisory' => $result['ai_advisory']]);

                if ($result['ai_advisory'] !== GeminiService::FALLBACK_ADVISORY) {
                    $this->syncTriggerContexts($anime->id, $result['matched_triggers'], $dbTriggerContents, $availableTriggerNames);
                }

                $processedCount++;
                sleep(2);
            } catch (\Exception $e) {
                Log::error("Gemini Advisory Failed for Anime ID {$anime->id}: " . $e->getMessage());
                $anime->update(['ai_advisory' => GeminiService::FALLBACK_ADVISORY]);
            }
        }

        // -------------------------------------------------------------------------
        // Phase 2: Gap-fill (anime already have an advisory but are missing rows)
        // -------------------------------------------------------------------------
        $remainingSlots = $limit - $processedCount;

        if ($remainingSlots <= 0) {
            Cache::put($cacheKey, $dailyRequests + $processedCount, now()->addHours(24));
            return;
        }

        $gapAnimes = Anime::whereNotNull('ai_advisory')
            ->where('ai_advisory', '!=', GeminiService::FALLBACK_ADVISORY)
            ->where('source', '!=', 'Original')
            ->where('rating', '!=', 'Rx - Hentai')
            ->whereRaw(
                '(SELECT COUNT(*) FROM anime_trigger_contexts WHERE anime_trigger_contexts.anime_id = animes.id) < ?',
                [$totalTriggerCount]
            )
            ->orderByRaw("animes.type = 'TV' DESC")
            ->orderBy('animes.year', 'desc')
            ->orderBy('animes.score', 'desc')
            ->limit($remainingSlots)
            ->get();

        foreach ($gapAnimes as $anime) {
            if ($processedCount >= $limit) {
                break;
            }

            // Resolve exactly which trigger names are missing for this anime
            $existingTriggerIds = AnimeTriggerContext::where('anime_id', $anime->id)
                ->pluck('trigger_content_id')
                ->flip() // flip to use as a set for O(1) lookup
                ->all();

            $missingTriggerNames = array_keys(
                array_filter($dbTriggerContents, fn($id) => ! isset($existingTriggerIds[$id]))
            );

            if (empty($missingTriggerNames)) {
                continue;
            }

            try {
                // Pass ONLY the missing triggers to avoid re-evaluating ones already stored
                $result = $geminiService->generateAnimeAdvisory($anime->title, $missingTriggerNames, $anime->rating);

                if ($result['ai_advisory'] !== GeminiService::FALLBACK_ADVISORY) {
                    $this->syncTriggerContexts($anime->id, $result['matched_triggers'], $dbTriggerContents, $missingTriggerNames);
                }

                $processedCount++;
                sleep(2);
            } catch (\Exception $e) {
                Log::error("Gemini Gap-Fill Failed for Anime ID {$anime->id}: " . $e->getMessage());
            }
        }

        Cache::put($cacheKey, $dailyRequests + $processedCount, now()->addHours(24));
    }

    /**
     * Persist AnimeTriggerContext rows from a matched_triggers payload.
     * Missing or unmatched targets will receive a fallback placeholder string.
     *
     * @param array<array{trigger_name: string, ai_summary: string}> $matchedTriggers
     * @param array<string, int> $dbTriggerContents name => id
     * @param array<string> $evaluatedTriggerNames List of triggers evaluated in this batch
     */
    private function syncTriggerContexts(int $animeId, array $matchedTriggers, array $dbTriggerContents, array $evaluatedTriggerNames): void
    {
        // Map out the positive matches returned by the AI for quick lookup
        $matchedMap = [];
        foreach ($matchedTriggers as $matched) {
            $name = $matched['trigger_name'] ?? '';
            $summary = $matched['ai_summary'] ?? '';
            if (! empty($name) && ! empty($summary)) {
                $matchedMap[$name] = $summary;
            }
        }

        // Write a record for every trigger sent during this specific evaluation cycle
        foreach ($evaluatedTriggerNames as $name) {
            if (array_key_exists($name, $dbTriggerContents)) {
                $summary = $matchedMap[$name] ?? GeminiService::FALLBACK_CONTEXT;

                AnimeTriggerContext::updateOrCreate(
                    [
                        'anime_id'           => $animeId,
                        'trigger_content_id' => $dbTriggerContents[$name],
                    ],
                    ['ai_summary' => $summary]
                );
            }
        }
    }
}
