<?php

namespace App\Http\Controllers;

use App\DTOs\AnimeData;
use App\DTOs\TriggerContentData;
use App\Services\AnimeService;
use App\Services\CommentService;
use App\Services\TriggerService;
use Inertia\Inertia;

class TriggerCommentController extends Controller
{
    public function __construct(
        private CommentService $commentService,
        private AnimeService $animeService,
        private TriggerService $triggerService,
    ) {}

    public function getTriggerComment(string $animeSlug, string $triggerContentSlug)
    {
        $anime = $this->animeService->getAnimeInfo($animeSlug);
        $triggerContent = $this->triggerService->findTriggerContentBySlug($triggerContentSlug);
        $triggerStatData = $this->triggerService->getTriggerStat($anime->id, $triggerContent->id);

        return Inertia::render('TriggerComment/Index', [
            'anime' => AnimeData::fromModel($anime),
            'triggerContent' => TriggerContentData::fromModel($triggerContent),
            'triggerStatData' => $triggerStatData
        ]);
    }
}
