<?php

namespace App\Http\Controllers;

use App\DTOs\AnimeData;
use App\DTOs\CommentData;
use App\DTOs\PaginatedCommentData;
use App\DTOs\TriggerContentData;
use App\Models\Comment;
use App\Services\AnimeService;
use App\Services\CommentService;
use App\Services\TriggerService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
        $triggerCommentsData = $this->commentService->getComments(
            'trigger_content',
            $triggerContent->id,
            $anime->id,
            25,
            $sortBy
        );

        $triggerComments = PaginatedCommentData::fromPaginator(
            $triggerCommentsData->through(fn(Comment $item): CommentData => CommentData::fromModel($item))
        );

        return Inertia::render('TriggerComment/Index', [
            'anime' => AnimeData::fromModel($anime),
            'triggerContent' => TriggerContentData::fromModel($triggerContent),
            'sortBy' => $sortBy,
            'triggerStatData' => $triggerStatData,
            'triggerComments' => $triggerComments,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'commentable_id' => ['required'],
            'body' => ['required'],
            'parent_comment_id' => 'nullable|exists:comments,id',
            'slug' => ['required'],
        ]);

        $tempComment = new Comment(['body' => $validated['body']]);

        if (empty(trim($tempComment->body_html))) {
            Inertia::flash('error', 'Comment not allowed');
            return back();
        }

        $user = Auth::user();

        $anime = $this->animeService->getAnimeInfo($validated['slug']);
        $validated['anime_id'] = $anime->id;

        if (isset($validated['parent_comment_id'])) {
            $parentId = $validated['parent_comment_id']
                ? $this->commentService->findCommentFirst($validated['parent_comment_id'])->id
                : null;
        } else {
            $parentId = null;
        }

        $this->commentService->storeComment(
            userId: $user->id,
            commentableType: 'trigger_content',
            commentableId: $validated['commentable_id'],
            data: $validated,
            parentCommentId: $parentId
        );

        Inertia::flash('success', 'Comment submitted');

        return back();
    }
}
