<?php

namespace App\Services;

use App\DTOs\AnimeData;
use App\DTOs\PaginatedAnimeData;
use App\DTOs\TriggerData;
use App\Models\Anime;
use App\Models\MasterTrigger;
use Cache;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;

use function Illuminate\Support\now;

class AnimeService
{
    /**
     * @param  array<string,mixed>  $filter
     * @param  array<string,string>  $sort
     */
    public function fetchAnimes(
        array $filter,
        array $sort,
        int $paginateLimit = 15
    ): PaginatedAnimeData {
        $user = Auth::user();

        $query = Anime::query()
            ->when($user?->show_nsfw !== true, function ($q) {
                $q->where('animes.is_not_hentai', 1);
            })->when(filled($filter['query'] ?? null), function ($q) use ($filter) {
                $rawTerm = trim($filter['query']);
                $booleanTerm = $this->buildBooleanSearch($rawTerm);

                if ($booleanTerm !== null) {
                    $q->whereRaw(
                        'MATCH(title, title_english, title_japanese, title_synonyms_text) AGAINST (? IN BOOLEAN MODE)',
                        [$booleanTerm]
                    );

                    $q->select('animes.id')
                        ->selectRaw(
                            'MATCH(title, title_english, title_japanese, title_synonyms_text) AGAINST (? IN BOOLEAN MODE) AS relevance',
                            [$booleanTerm]
                        )
                        ->orderByDesc('relevance');
                } else {
                    $q->where(function ($subQuery) use ($rawTerm) {
                        $subQuery->where('title', 'like', '%' . $rawTerm . '%')
                            ->orWhere('title_english', 'like', '%' . $rawTerm . '%')
                            ->orWhere('title_japanese', 'like', '%' . $rawTerm . '%')
                            ->orWhere('title_synonyms_text', 'like', '%' . $rawTerm . '%');
                    });
                }
            });

        if (empty($filter['query']) || $this->buildBooleanSearch(trim($filter['query'])) === null) {
            $query->select('animes.id');
        }

        $query->when(array_key_exists('airing', $filter) && ! is_null($filter['airing']), function ($q) use ($filter) {
            $q->where('animes.airing', (bool) $filter['airing'])->where('animes.year', 2026);
        });

        $query->when(array_key_exists('upcoming', $filter) && ! is_null($filter['upcoming']), function ($q) {
            $q->where('animes.year', '>', 2026);
        });

        if (! empty($filter['from_airing'])) {
            $query->where('animes.year', '>=', (int) $filter['from_airing']);
        }
        if (! empty($filter['to_airing'])) {
            $query->where('animes.year', '<=', (int) $filter['to_airing']);
        }

        if (! empty($filter['season'])) {
            $query->where('animes.season', $filter['season']);
        }
        if (! empty($filter['type'])) {
            $query->where('animes.type', $filter['type']);
        }
        if (! empty($filter['rating'])) {
            $query->where('animes.rating', $filter['rating']);
        }

        $flagString = 'No significant content found for this trigger.';

        if (! empty($filter['triggers_include'])) {
            $includeIds = is_array($filter['triggers_include']) ? $filter['triggers_include'] : explode(',', $filter['triggers_include']);
            foreach ($includeIds as $id) {
                $query->whereIn('animes.id', function ($q) use ($id, $flagString) {
                    $q->select('anime_id')
                        ->from('anime_trigger_contexts')
                        ->where('trigger_content_id', $id)
                        ->where(function ($sub) use ($flagString) {
                            $sub->whereNull('ai_summary')
                                ->orWhere('ai_summary', '!=', $flagString);
                        });
                });
            }
        }

        if (! empty($filter['triggers_exclude'])) {
            $excludeIds = is_array($filter['triggers_exclude']) ? $filter['triggers_exclude'] : explode(',', $filter['triggers_exclude']);
            $query->whereNotIn('animes.id', function ($q) use ($excludeIds, $flagString) {
                $q->select('anime_id')
                    ->from('anime_trigger_contexts')
                    ->whereIn('trigger_content_id', $excludeIds)
                    ->where(function ($sub) use ($flagString) {
                        $sub->whereNull('ai_summary')
                            ->orWhere('ai_summary', '!=', $flagString);
                    });
            });
        }

        if (! empty($filter['genres_include'])) {
            $includeIds = is_array($filter['genres_include']) ? $filter['genres_include'] : explode(',', $filter['genres_include']);
            foreach ($includeIds as $id) {
                $query->whereIn('animes.id', Anime::whereHas('genres', function ($q) use ($id) {
                    $q->where('genres.id', $id);
                })->select('id'));
            }
        }
        if (! empty($filter['genres_exclude'])) {
            $excludeIds = is_array($filter['genres_exclude']) ? $filter['genres_exclude'] : explode(',', $filter['genres_exclude']);
            $query->whereNotIn('animes.id', Anime::whereHas('genres', function ($q) use ($excludeIds) {
                $q->whereIn('genres.id', $excludeIds);
            })->select('id'));
        }

        if (! empty($filter['themes_include'])) {
            $includeIds = is_array($filter['themes_include']) ? $filter['themes_include'] : explode(',', $filter['themes_include']);
            foreach ($includeIds as $id) {
                $query->whereIn('animes.id', Anime::whereHas('themes', function ($q) use ($id) {
                    $q->where('themes.id', $id);
                })->select('id'));
            }
        }
        if (! empty($filter['themes_exclude'])) {
            $excludeIds = is_array($filter['themes_exclude']) ? $filter['themes_exclude'] : explode(',', $filter['themes_exclude']);
            $query->whereNotIn('animes.id', Anime::whereHas('themes', function ($q) use ($excludeIds) {
                $q->whereIn('themes.id', $excludeIds);
            })->select('id'));
        }

        $query->when(! empty($sort['sort']), function ($q) use ($sort) {
            $direction = strtolower($sort['order'] ?? 'asc') === 'desc' ? 'desc' : 'asc';
            $q->orderBy('animes.' . $sort['sort'], $direction);
        }, function ($q) {
            $q->orderBy('animes.is_tv_priority', 'desc')
                ->orderBy('animes.year', 'desc')
                ->orderBy('animes.airing', 'desc')
                ->orderBy('animes.score', 'desc');
        });

        $paginator = $query->paginate($paginateLimit)->onEachSide(1)->withQueryString();

        if ($paginator->isNotEmpty()) {
            $ids = $paginator->pluck('id')->toArray();
            $models = Anime::with(['genres', 'animeTriggers.triggerContent'])
                ->whereIn('id', $ids)
                ->get()
                ->keyBy('id');

            $sortedModels = collect($ids)->map(fn($id) => $models[$id]);
            $paginator->setCollection($sortedModels);
        }

        $transformed = $paginator->through(fn(Anime $item): AnimeData => AnimeData::fromModel($item));

        return PaginatedAnimeData::fromPaginator($transformed);
    }

    /**
     * @return array<int, AnimeData>
     */
    public function fetchTopAnime(int $limit = 12): array
    {
        return Cache::tags(['anime', 'top_anime'])
            ->remember("top_anime_{$limit}", now()->plus(days: 3), function () use ($limit) {
                $topIds = Anime::query()
                    ->where('rating', '!=', 'Rx - Hentai')
                    ->orderByRaw("animes.type = 'TV' DESC")
                    ->orderBy('animes.score', 'desc')
                    ->orderBy('animes.year', 'desc')
                    ->orderBy('animes.airing', 'desc')
                    ->limit($limit)
                    ->pluck('id');

                if ($topIds->isEmpty()) {
                    return [];
                }

                $animes = Anime::with(['genres', 'animeTriggers.triggerContent'])
                    ->whereIn('id', $topIds)
                    ->get()
                    ->keyBy('id');

                return $topIds->map(fn($id) => AnimeData::fromModel($animes[$id]))
                    ->values()
                    ->all();
            });
    }

    /**
     * @return array<int, AnimeData>
     */
    public function getNowAiringFromDatabase(int $limit = 12): array
    {
        $airingIds = Anime::query()
            ->where('airing', true)
            ->where('year', now()->year)
            ->where('rating', '!=', 'Rx - Hentai')
            ->orderByRaw("animes.type = 'TV' DESC")
            ->orderBy('animes.year', 'desc')
            ->orderBy('animes.airing', 'desc')
            ->orderBy('animes.score', 'desc')
            ->orderBy('score', 'desc')
            ->limit($limit)
            ->pluck('id');

        if ($airingIds->isEmpty()) {
            return [];
        }

        $animes = Anime::with(['genres', 'animeTriggers.triggerContent'])
            ->whereIn('id', $airingIds)
            ->get()
            ->keyBy('id');

        return $animes->map(fn($item) => AnimeData::fromModel($item))->values()->all();
    }

    public function getAnimeInfo(string $slug): Anime
    {
        return Anime::with([
            'demographics',
            'genres',
            'producers',
            'studios',
            'themes',
            'triggerContexts',
            'animeRelations',
            'animeRelations.anime'
        ])
            ->where('slug', $slug)->firstOrFail();
    }

    /**
     * @return Collection<int, TriggerData>
     */
    public function getAnimeTriggers(int $animeId): Collection
    {
        $triggersFromDb = MasterTrigger::with([
            'triggerContents' => function ($query) {
                $query->orderBy('importance', 'desc');
            },
            'triggerContents.animeTriggers' => function ($query) use ($animeId) {
                $query->where('anime_id', $animeId);
            },
        ])
            ->orderBy('importance', 'desc')->get();

        return $triggersFromDb->map(fn(MasterTrigger $trigger) => TriggerData::fromModel($trigger));
    }

    /**
     * @return array<int, int>
     */
    public function getAnimeYear(): array
    {
        return Cache::remember('year', now()->plus(days: 14), function () {
            return Anime::whereNotNull('year')
                ->orderBy('year', 'desc')
                ->distinct()
                ->pluck('year')
                ->toArray();
        });
    }

    public function getStaffPickAnime()
    {
        return Cache::tags(['anime', 'staff_picks'])
            ->remember('staff_pick_anime', now()->plus(days: 3), function () {
                return Anime::where('staff_pick', true)
                    ->select('slug', 'title', 'title_english')
                    ->get()
                    ->toArray();
            });
    }

    private function buildBooleanSearch(string $input): ?string
    {
        $input = trim(mb_strtolower($input));

        if ($input === '') {
            return null;
        }

        $tokens = preg_split('/[^\p{L}\p{N}]+/u', $input, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $stopwords = [
            'a',
            'an',
            'as',
            'at',
            'in',
            'is',
            'it',
            'of',
            'on',
            'or',
            'to',
            'am',
            'be',
            'by',
            'do',
            'he',
            'if',
            'me',
            'my',
            'no',
            'so',
            'up',
            'us',
            'we',
            'i',
            'and',
            'the',
            'for',
            'with',
            'about',
            'are',
            'from',
            'how',
            'that',
            'this',
            'was',
            'what',
            'when',
            'where',
            'who',
            'will',
        ];

        $tokens = array_values(array_filter($tokens, static function ($token) use ($stopwords) {
            return ! in_array($token, $stopwords, true);
        }));

        if ($tokens === []) {
            return null;
        }

        return implode(' ', array_map(static fn($token) => '+' . $token . '*', $tokens));
    }
}
