<?php

namespace App\Services;

use App\DTOs\CountStatData;
use App\DTOs\TriggerFramingStatData;
use App\DTOs\TriggerVoteActivityData;
use App\DTOs\WatchlistStatData;
use App\Models\AnimeTrigger;
use App\Models\Watchlist;
use Carbon\CarbonPeriod;

class StatService
{
    public function getWatchlistStat(int $userId): WatchlistStatData
    {
        $defaultStats = [
            'planned' => 0,
            'watching' => 0,
            'completed' => 0,
            'on_hold' => 0,
            'dropped' => 0,
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

    public function getCountStat(int $userId): CountStatData
    {
        $rawStats = Watchlist::where('user_id', $userId)
            ->selectRaw('
                COUNT(*) as total,
                SUM(progress) as total_progress,
                AVG(score) as avg_score,
                COUNT(CASE WHEN status = "watching" THEN 1 END) as watching,
                COUNT(CASE WHEN status = "completed" THEN 1 END) as completed,
                COUNT(CASE WHEN status = "dropped" THEN 1 END) as dropped
            ')
            ->first();

        $total = (int) ($rawStats->total ?? 0);
        $completed = (int) ($rawStats->completed ?? 0);
        $dropped = (int) ($rawStats->dropped ?? 0);

        // Prevent division by zero if the watchlist is empty
        $completionRate = $total > 0 ? (int) round(($completed / $total) * 100) : 0;
        $dropRate = $total > 0 ? (int) round(($dropped / $total) * 100) : 0;

        $finalStats = [
            'total' => $total,
            'total_progress' => (int) ($rawStats->total_progress ?? 0),
            'watching' => (int) ($rawStats->watching ?? 0),
            'completion_rate' => $completionRate,
            'drop_rate' => $dropRate,
            'avg_score' => $rawStats->avg_score ? round((float) $rawStats->avg_score, 1) : 0.0,
        ];

        return CountStatData::fromArray($finalStats);
    }

    public function getUserVoteActivity(int $userId): TriggerVoteActivityData
    {
        $rawStat = AnimeTrigger::where('user_id', $userId)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->where('created_at', '>=', now()->subYear())
            ->groupBy('date')
            ->orderBy('date', 'ASC')
            ->pluck('total', 'date');

        // Build a continuous date timeline range
        $startDate = now()->subYear()->startOfDay();
        $endDate = now()->endOfDay();
        $period = CarbonPeriod::create($startDate, '1 day', $endDate);

        // Map out the timeline ensuring missing calendar entries default to 0
        $formattedDays = [];
        foreach ($period as $date) {
            $formattedDate = $date->format('Y-m-d');
            $formattedDays[] = [
                'date' => $formattedDate,
                'count' => (int) ($rawStat->get($formattedDate, 0)),
            ];
        }

        return TriggerVoteActivityData::fromArray($formattedDays);
    }
}
