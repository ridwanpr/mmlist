<?php

namespace App\Services;

use App\DTOs\TriggerFramingStatData;
use App\DTOs\WatchlistStatData;
use App\Models\AnimeTrigger;
use App\Models\Watchlist;

class StatService
{
    public function getWatchlistStat(int $userId): WatchlistStatData
    {
        $defaultStats = [
            'planned'   => 0,
            'watching'  => 0,
            'completed' => 0,
            'on_hold'   => 0,
            'dropped'   => 0,
        ];

        $counts = Watchlist::where('user_id', $userId)
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status')
            ->toArray();

        // Merge so statuses with 0 counts are still included
        $finalStats = array_merge($defaultStats, $counts);

        return WatchlistStatData::fromArray($finalStats);
    }

    public function getTriggerFramingStat(int $userId)
    {
        $defaultStats = [
            'Serious' => 0,
            'Neutral' => 0,
            'Romanticized' => 0,
            'Comedic' => 0,
        ];

        $counts = AnimeTrigger::where('user_id', $userId)
            ->selectRaw('framing, count(*) as total')
            ->groupBy('framing')
            ->pluck('total', 'framing')
            ->toArray();

        $finalStats = array_merge($defaultStats, $counts);

        return TriggerFramingStatData::fromArray($finalStats);
    }
}
