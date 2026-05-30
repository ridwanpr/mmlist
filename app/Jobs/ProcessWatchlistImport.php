<?php

namespace App\Jobs;

use App\Models\Anime;
use App\Models\Watchlist;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use SimpleXMLElement;

class ProcessWatchlistImport implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(
        protected string $filePath,
        protected int $userId
    ) {}

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if (!Storage::exists($this->filePath)) {
            return;
        }

        $xmlString = Storage::get($this->filePath);
        $xml = simplexml_load_string($xmlString, 'SimpleXMLElement', LIBXML_NOCDATA);

        if (!$xml || !isset($xml->anime)) {
            Storage::delete($this->filePath);
            return;
        }

        $xmlMalIds = [];
        foreach ($xml->anime as $animeData) {
            $xmlMalIds[] = (int) $animeData->series_animedb_id;
        }

        if (empty($xmlMalIds)) {
            Storage::delete($this->filePath);
            return;
        }

        $localAnimeMap = Anime::whereIn('mal_id', $xmlMalIds)->get()->keyBy('mal_id');

        $statusMap = [
            'Watching'      => 'watching',
            'Completed'     => 'completed',
            'On-Hold'       => 'on_hold',
            'Dropped'       => 'dropped',
            'Plan to Watch' => 'planned',
        ];

        DB::transaction(function () use ($xml, $localAnimeMap, $statusMap) {
            foreach ($xml->anime as $animeData) {
                $malId = (int) $animeData->series_animedb_id;
                if (!isset($localAnimeMap[$malId])) {
                    continue;
                }

                $animeModel = $localAnimeMap[$malId];
                $malStatus = (string) $animeData->my_status;
                $status = $statusMap[$malStatus] ?? 'planned';

                $score = (int) $animeData->my_score;
                $finalScore = $score > 0 ? $score : null;

                $progress = (int) $animeData->my_watched_episodes;
                $note = (string) $animeData->my_comments;

                $startedAt = (string) $animeData->my_start_date;
                $completedAt = (string) $animeData->my_finish_date;

                $startedAt = ($startedAt !== '0000-00-00') ? $startedAt : null;
                $completedAt = ($completedAt !== '0000-00-00') ? $completedAt : null;

                Watchlist::updateOrCreate(
                    [
                        'user_id'  => $this->userId,
                        'anime_id' => $animeModel->id,
                    ],
                    [
                        'status'       => $status,
                        'progress'     => $progress,
                        'score'        => $finalScore,
                        'note'         => filled($note) ? $note : null,
                        'started_at'   => $startedAt,
                        'completed_at' => $completedAt,
                    ]
                );
            }
        });

        Storage::delete($this->filePath);
    }

    /**
     * Handle job failure execution paths.
     */
    public function failed(\Throwable $exception): void
    {
        Storage::delete($this->filePath);
    }
}
