<?php

namespace App\Http\Controllers;

use App\DTOs\AnimeData;
use App\DTOs\TriggerContentData;
use App\Services\AnimeService;
use App\Services\CommentService;
use App\Services\TriggerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class TriggerCommentController extends Controller
{
    public function __construct(
        private CommentService $commentService,
        private AnimeService $animeService,
        private TriggerService $triggerService,
    ) {}

    public function getTriggerComment(
        Request $request,
        string $animeSlug,
        string $triggerContentSlug
    ) {
        $sortInput = $request->query('sort');
        $allowedSorts = ['latest', 'most-loved', 'oldest'];
        $sortBy = in_array($sortInput, $allowedSorts) ? $sortInput : 'most-loved';

        $anime = $this->animeService->getAnimeInfo($animeSlug);
        $triggerContent = $this->triggerService->findTriggerContentBySlug($triggerContentSlug);
        $triggerStatData = $this->triggerService->getTriggerStat($anime->id, $triggerContent->id);
        $triggerComments = $this->commentService->getComments('trigger_content', $triggerContent->id, 25, $sortBy);

        return Inertia::render('TriggerComment/Index', [
            'anime' => AnimeData::fromModel($anime),
            'triggerContent' => TriggerContentData::fromModel($triggerContent),
            'sortBy' => $sortBy,
            'triggerStatData' => $triggerStatData,
            'triggerComments' => $triggerComments
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'commentable_type' => ['required', Rule::in(['trigger_content'])],
            'commentable_id' => ['required'],
            'body' => ['required']
        ]);

        $user = Auth::user();

        $this->commentService->storeComment(
            userId: $user->id,
            commentableType: $validated['commentable_type'],
            commentableId: $validated['commentable_id'],
            data: $validated
        );

        Inertia::flash('success', 'Comment submitted');
        return back();
    }
}
