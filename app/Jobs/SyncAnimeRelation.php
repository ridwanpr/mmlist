<?php

namespace App\Jobs;

use App\Models\Anime;
use App\Services\AnimeSyncService;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class SyncAnimeRelation implements ShouldQueue
{
    use Dispatchable, Queueable;

    public int $timeout = 600;

    public function handle(AnimeSyncService $animeSyncService): void
    {
        $failedIds = Redis::smembers('anime_sync:failed_ids') ?: [];

        $animes = Anime::query()
            ->whereDoesntHave('animeRelations')
            ->when(!empty($failedIds), function ($query) use ($failedIds) {
                $query->whereNotIn('id', $failedIds);
            })
            ->orderByDesc('year')
            ->orderByDesc('score')
            ->orderByDesc('id')
            ->limit(200)
            ->get(['id', 'mal_id']);

        if ($animes->isEmpty()) {
            Log::info("Synchronization complete. No remaining anime require relation processing. Flushing Redis tracking cache.");
            Redis::del('anime_sync:failed_ids');
            return;
        }

        Log::info("Processing a persistent batch of " . $animes->count() . " anime records.");

        foreach ($animes as $anime) {
            try {
                $animeSyncService->syncAnimeRelations($anime->mal_id, $anime->id);
            } catch (Exception $e) {
                Log::error("Failed syncing relations for mal_id {$anime->mal_id}: " . $e->getMessage());
                    
                Redis::sadd('anime_sync:failed_ids', $anime->id);
            }

            // 1.06 seconds rate limit sleep
            usleep(1060000);
        }

        Log::info("Batch complete. Re-dispatching next sequence.");
        self::dispatch();
    }
}
