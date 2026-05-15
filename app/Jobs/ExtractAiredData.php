<?php

namespace App\Jobs;

use App\Models\Anime;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Carbon;

class ExtractAiredData implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct() {}

    public function handle(): void
    {
        Anime::whereNotNull('aired')->lazy()->each(function ($anime) {
            $aired = is_string($anime->aired) ? json_decode($anime->aired, true) : $anime->aired;

            if (!$aired) {
                return;
            }

            $from = !empty($aired['from']) ? Carbon::parse($aired['from']) : null;
            $to   = !empty($aired['to'])   ? Carbon::parse($aired['to'])   : null;

            $updateData = [
                'from'           => $from,
                'to'             => $to,
                'from_to_string' => $aired['string'] ?? null,
            ];

            if ($from) {
                $updateData['season'] = $this->deriveSeason($from);
                $updateData['year']   = $from->year;
            }

            $anime->update($updateData);
        });
    }

    private function deriveSeason(Carbon $from): string
    {
        return match (true) {
            $from->month <= 3  => 'winter',
            $from->month <= 6  => 'spring',
            $from->month <= 9  => 'summer',
            default            => 'fall',
        };
    }
}
