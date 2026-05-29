<?php

namespace App\Jobs;

use App\Models\Anime;
use App\Services\AnimeSyncService;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SyncAnimeRelation implements ShouldQueue
{
    use Dispatchable, Queueable;

    public int $timeout = 50000;

    public function handle(AnimeSyncService $animeSyncService): void
    {
        Anime::query()
            ->whereDoesntHave('animeRelations')
            ->select(['id', 'mal_id'])
            ->chunk(200, function ($animes) use ($animeSyncService) {
                foreach ($animes as $anime) {
                    try {
                        $animeSyncService->syncAnimeRelations($anime->mal_id, $anime->id);
                    } catch (Exception $e) {
                        Log::error("Failed syncing relations for mal_id {$anime->mal_id}: " . $e->getMessage());
                    }
                    usleep(1500000);
                }
            });
    }
}
