<?php

namespace App\Jobs;

use App\Services\AnimeSyncService;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class SyncAnimeCatalog implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $timeout = 120;

    public int $tries = 3;

    public function __construct(public int $page = 1) {}

    public function handle(AnimeSyncService $animeSyncService): void
    {
        Log::info("Syncing catalog page: {$this->page}");

        try {
            $hasNextPage = $animeSyncService->syncCatalogPage($this->page);

            if ($hasNextPage) {
                self::dispatch($this->page + 1)->delay(now()->addSeconds(2));

                return;
            }

            Log::info("Finished syncing the entire anime catalog on page {$this->page}!");
        } catch (Exception $e) {
            Log::error("Failed to sync catalog on page {$this->page}: ".$e->getMessage());
            throw $e;
        }
    }
}
