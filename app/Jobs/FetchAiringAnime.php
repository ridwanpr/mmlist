<?php

namespace App\Jobs;

use App\Services\AnimeSyncService;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class FetchAiringAnime implements ShouldQueue
{
    use Queueable;

    public $timeout = 1200;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(AnimeSyncService $animeSyncService): void
    {
        $page = 1;
        $hasNextPage = true;
        $allSyncedMalIds = [];

        Log::info('Starting background sync for all airing anime.');

        while ($hasNextPage) {
            try {
                Log::info("Fetching airing anime page: {$page}");

                $result = $animeSyncService->syncAiringAnimePage($page);

                $hasNextPage = $result['has_next_page'];
                $allSyncedMalIds = array_merge($allSyncedMalIds, $result['synced_mal_ids']);

                $page++;

                if ($hasNextPage) {
                    // Rate limiting: 3 req/sec, 60 req/min limit from Jikan.
                    // 1,500,000 microseconds = 1.5 seconds.
                    usleep(1500000);
                }
            } catch (Exception $e) {
                Log::error("Failed to sync airing anime on page {$page}: ".$e->getMessage());
                throw $e;
            }
        }

        // Once all pages are fetched, run a single query to update the airing status
        // of anime that are no longer in the current season's payload.
        if (! empty($allSyncedMalIds)) {
            $animeSyncService->cleanupStaleAiringAnime($allSyncedMalIds);
            Log::info('Cleaned up stale airing statuses.');
        }

        Log::info('Finished fetching all airing anime. Total items synced: '.count($allSyncedMalIds));
    }
}
