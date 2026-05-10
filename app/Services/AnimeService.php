<?php

namespace App\Services;

use Exception;
use App\DTOs\AnimeData;
use App\Models\AnimeDemographic;
use App\Models\AnimeGenre;
use App\Models\Demographic;
use App\Models\Genre;
use App\Repositories\AnimeRepository;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use App\Models\Anime;
use App\Models\AnimeProducer;
use App\Models\AnimeStudio;
use App\Models\AnimeTheme;
use App\Models\Producer;
use App\Models\Studio;
use App\Models\Theme;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class AnimeService
{
    public function __construct(private AnimeRepository $animeRepository) {}

    /** @var list<array<string, mixed>> */
    public array $dummy = [
        [
            'mal_id' => 51553,
            'url' => 'https://myanimelist.net/anime/51553/Tongari_Boushi_no_Atelier',
            'images' => [
                'jpg' => [
                    'image_url' => 'https://myanimelist.net/images/anime/1726/155542.jpg',
                    'small_image_url' => 'https://myanimelist.net/images/anime/1726/155542t.jpg',
                    'large_image_url' => 'https://myanimelist.net/images/anime/1726/155542l.jpg',
                ],
                'webp' => [
                    'image_url' => 'https://myanimelist.net/images/anime/1726/155542.webp',
                    'small_image_url' => 'https://myanimelist.net/images/anime/1726/155542t.webp',
                    'large_image_url' => 'https://myanimelist.net/images/anime/1726/155542l.webp',
                ],
            ],
            'trailer' => [
                'youtube_id' => null,
                'url' => null,
                'embed_url' => 'https://www.youtube-nocookie.com/embed/d1reryPOMX0?enablejsapi=1&wmode=opaque&autoplay=1',
                'images' => [
                    'image_url' => null,
                    'small_image_url' => null,
                    'medium_image_url' => null,
                    'large_image_url' => null,
                    'maximum_image_url' => null,
                ],
            ],
            'approved' => true,
            'titles' => [
                [
                    'type' => 'Default',
                    'title' => 'Tongari Boushi no Atelier',
                ],
                [
                    'type' => 'Synonym',
                    'title' => 'Atelier of Witch Hat',
                ],
                [
                    'type' => 'Japanese',
                    'title' => 'とんがり帽子のアトリエ',
                ],
                [
                    'type' => 'English',
                    'title' => 'Witch Hat Atelier',
                ],
            ],
            'title' => 'Tongari Boushi no Atelier',
            'title_english' => 'Witch Hat Atelier',
            'title_japanese' => 'とんがり帽子のアトリエ',
            'title_synonyms' => [
                'Atelier of Witch Hat',
            ],
            'type' => 'TV',
            'source' => 'Manga',
            'episodes' => 13,
            'status' => 'Currently Airing',
            'airing' => true,
            'aired' => [
                'from' => '2026-04-06T00:00:00+00:00',
                'to' => null,
                'prop' => [
                    'from' => [
                        'day' => 6,
                        'month' => 4,
                        'year' => 2026,
                    ],
                    'to' => [
                        'day' => null,
                        'month' => null,
                        'year' => null,
                    ],
                ],
                'string' => 'Apr 6, 2026 to ?',
            ],
            'duration' => '23 min per ep',
            'rating' => 'PG-13 - Teens 13 or older',
            'score' => 8.76,
            'scored_by' => 36756,
            'rank' => 49,
            'popularity' => 1106,
            'members' => 254094,
            'favorites' => 2490,
            'synopsis' => "Coco, a humble dressmaker's daughter, has always been fascinated by magic and the witches who cast it...",
            'background' => 'Beginning with episode 2, each episode was streamed one week in advance of the TV broadcast starting on April 6, 2026, on Abema.',
            'season' => 'spring',
            'year' => 2026,
            'broadcast' => [
                'day' => 'Mondays',
                'time' => '23:00',
                'timezone' => 'Asia/Tokyo',
                'string' => 'Mondays at 23:00 (JST)',
            ],
            'producers' => [
                [
                    'mal_id' => 159,
                    'type' => 'anime',
                    'name' => 'Kodansha',
                    'url' => 'https://myanimelist.net/anime/producer/159/Kodansha',
                ],
            ],
            'licensors' => [],
            'studios' => [
                [
                    'mal_id' => 2674,
                    'type' => 'anime',
                    'name' => 'BUG FILMS',
                    'url' => 'https://myanimelist.net/anime/producer/2674/BUG_FILMS',
                ],
            ],
            'genres' => [
                [
                    'mal_id' => 10,
                    'type' => 'anime',
                    'name' => 'Fantasy',
                    'url' => 'https://myanimelist.net/anime/genre/10/Fantasy',
                ],
            ],
            'explicit_genres' => [],
            'themes' => [],
            'demographics' => [
                [
                    'mal_id' => 42,
                    'type' => 'anime',
                    'name' => 'Seinen',
                    'url' => 'https://myanimelist.net/anime/genre/42/Seinen',
                ],
                [
                    'mal_id' => 27,
                    'type' => 'anime',
                    'name' => 'Shounen',
                    'url' => 'https://myanimelist.net/anime/genre/27/Shounen',
                ],
            ],
        ],
        [
            'mal_id' => 52991,
            'url' => 'https://myanimelist.net/anime/52991/Sousou_no_Frieren',
            'images' => [
                'jpg' => [
                    'image_url' => 'https://myanimelist.net/images/anime/1015/138006.jpg',
                    'small_image_url' => 'https://myanimelist.net/images/anime/1015/138006t.jpg',
                    'large_image_url' => 'https://myanimelist.net/images/anime/1015/138006l.jpg',
                ],
                'webp' => [
                    'image_url' => 'https://myanimelist.net/images/anime/1015/138006.webp',
                    'small_image_url' => 'https://myanimelist.net/images/anime/1015/138006t.webp',
                    'large_image_url' => 'https://myanimelist.net/images/anime/1015/138006l.webp',
                ],
            ],
            'trailer' => [
                'youtube_id' => 'qgQKsRUcqZo',
                'url' => 'https://www.youtube.com/watch?v=qgQKsRUcqZo',
                'embed_url' => 'https://www.youtube-nocookie.com/embed/qgQKsRUcqZo?enablejsapi=1&wmode=opaque&autoplay=1',
                'images' => [
                    'image_url' => 'https://img.youtube.com/vi/qgQKsRUcqZo/default.jpg',
                    'small_image_url' => 'https://img.youtube.com/vi/qgQKsRUcqZo/sddefault.jpg',
                    'medium_image_url' => 'https://img.youtube.com/vi/qgQKsRUcqZo/mqdefault.jpg',
                    'large_image_url' => 'https://img.youtube.com/vi/qgQKsRUcqZo/hqdefault.jpg',
                    'maximum_image_url' => 'https://img.youtube.com/vi/qgQKsRUcqZo/maxresdefault.jpg',
                ],
            ],
            'approved' => true,
            'titles' => [
                [
                    'type' => 'Default',
                    'title' => 'Sousou no Frieren',
                ],
                [
                    'type' => 'Japanese',
                    'title' => '葬送のフリーレン',
                ],
                [
                    'type' => 'English',
                    'title' => 'Frieren: Beyond Journey\'s End',
                ],
            ],
            'title' => 'Sousou no Frieren',
            'title_english' => 'Frieren: Beyond Journey\'s End',
            'title_japanese' => '葬送のフリーレン',
            'title_synonyms' => [],
            'type' => 'TV',
            'source' => 'Manga',
            'episodes' => 28,
            'status' => 'Finished Airing',
            'airing' => false,
            'aired' => [
                'from' => '2023-09-29T00:00:00+00:00',
                'to' => '2024-03-22T00:00:00+00:00',
                'prop' => [
                    'from' => [
                        'day' => 29,
                        'month' => 9,
                        'year' => 2023,
                    ],
                    'to' => [
                        'day' => 22,
                        'month' => 3,
                        'year' => 2024,
                    ],
                ],
                'string' => 'Sep 29, 2023 to Mar 22, 2024',
            ],
            'duration' => '24 min per ep',
            'rating' => 'PG-13 - Teens 13 or older',
            'score' => 9.38,
            'scored_by' => 612453,
            'rank' => 1,
            'popularity' => 143,
            'members' => 1012351,
            'favorites' => 45672,
            'synopsis' => 'The demon king has been defeated, and the victorious hero party returns home before disbanding. The four mages, heroes, and warriors reflect on their decade-long journey and bid each other farewell.',
            'background' => 'Sousou no Frieren was awarded the 14th Manga Taisho in 2021.',
            'season' => 'fall',
            'year' => 2023,
            'broadcast' => [
                'day' => 'Fridays',
                'time' => '23:00',
                'timezone' => 'Asia/Tokyo',
                'string' => 'Fridays at 23:00 (JST)',
            ],
            'producers' => [
                [
                    'mal_id' => 17,
                    'type' => 'anime',
                    'name' => 'Aniplex',
                    'url' => 'https://myanimelist.net/anime/producer/17/Aniplex',
                ],
            ],
            'licensors' => [
                [
                    'mal_id' => 119,
                    'type' => 'anime',
                    'name' => 'VIZ Media',
                    'url' => 'https://myanimelist.net/anime/producer/119/VIZ_Media',
                ],
            ],
            'studios' => [
                [
                    'mal_id' => 11,
                    'type' => 'anime',
                    'name' => 'Madhouse',
                    'url' => 'https://myanimelist.net/anime/producer/11/Madhouse',
                ],
            ],
            'genres' => [
                [
                    'mal_id' => 2,
                    'type' => 'anime',
                    'name' => 'Adventure',
                    'url' => 'https://myanimelist.net/anime/genre/2/Adventure',
                ],
                [
                    'mal_id' => 8,
                    'type' => 'anime',
                    'name' => 'Drama',
                    'url' => 'https://myanimelist.net/anime/genre/8/Drama',
                ],
                [
                    'mal_id' => 10,
                    'type' => 'anime',
                    'name' => 'Fantasy',
                    'url' => 'https://myanimelist.net/anime/genre/10/Fantasy',
                ],
            ],
            'explicit_genres' => [],
            'themes' => [],
            'demographics' => [
                [
                    'mal_id' => 27,
                    'type' => 'anime',
                    'name' => 'Shounen',
                    'url' => 'https://myanimelist.net/anime/genre/27/Shounen',
                ],
            ],
        ],
        [
            'mal_id' => 54492,
            'url' => 'https://myanimelist.net/anime/54492/Kusuriya_no_Hitorigoto',
            'images' => [
                'jpg' => [
                    'image_url' => 'https://myanimelist.net/images/anime/1708/138033.jpg',
                    'small_image_url' => 'https://myanimelist.net/images/anime/1708/138033t.jpg',
                    'large_image_url' => 'https://myanimelist.net/images/anime/1708/138033l.jpg',
                ],
                'webp' => [
                    'image_url' => 'https://myanimelist.net/images/anime/1708/138033.webp',
                    'small_image_url' => 'https://myanimelist.net/images/anime/1708/138033t.webp',
                    'large_image_url' => 'https://myanimelist.net/images/anime/1708/138033l.webp',
                ],
            ],
            'trailer' => [
                'youtube_id' => '0P8yI6Q8iU4',
                'url' => 'https://www.youtube.com/watch?v=0P8yI6Q8iU4',
                'embed_url' => 'https://www.youtube-nocookie.com/embed/0P8yI6Q8iU4?enablejsapi=1&wmode=opaque&autoplay=1',
                'images' => [
                    'image_url' => 'https://img.youtube.com/vi/0P8yI6Q8iU4/default.jpg',
                    'small_image_url' => 'https://img.youtube.com/vi/0P8yI6Q8iU4/sddefault.jpg',
                    'medium_image_url' => 'https://img.youtube.com/vi/0P8yI6Q8iU4/mqdefault.jpg',
                    'large_image_url' => 'https://img.youtube.com/vi/0P8yI6Q8iU4/hqdefault.jpg',
                    'maximum_image_url' => 'https://img.youtube.com/vi/0P8yI6Q8iU4/maxresdefault.jpg',
                ],
            ],
            'approved' => true,
            'titles' => [
                [
                    'type' => 'Default',
                    'title' => 'Kusuriya no Hitorigoto',
                ],
                [
                    'type' => 'Japanese',
                    'title' => '薬屋のひとりごと',
                ],
                [
                    'type' => 'English',
                    'title' => 'The Apothecary Diaries',
                ],
            ],
            'title' => 'Kusuriya no Hitorigoto',
            'title_english' => 'The Apothecary Diaries',
            'title_japanese' => '薬屋のひとりごと',
            'title_synonyms' => [],
            'type' => 'TV',
            'source' => 'Light novel',
            'episodes' => 24,
            'status' => 'Finished Airing',
            'airing' => false,
            'aired' => [
                'from' => '2023-10-22T00:00:00+00:00',
                'to' => '2024-03-24T00:00:00+00:00',
                'prop' => [
                    'from' => [
                        'day' => 22,
                        'month' => 10,
                        'year' => 2023,
                    ],
                    'to' => [
                        'day' => 24,
                        'month' => 3,
                        'year' => 2024,
                    ],
                ],
                'string' => 'Oct 22, 2023 to Mar 24, 2024',
            ],
            'duration' => '22 min per ep',
            'rating' => 'PG-13 - Teens 13 or older',
            'score' => 8.91,
            'scored_by' => 381920,
            'rank' => 21,
            'popularity' => 258,
            'members' => 701540,
            'favorites' => 29410,
            'synopsis' => "Maomao, an apothecary's daughter, has been plucked from her peaceful life and sold to the lowest echelons of the imperial court.",
            'background' => '',
            'season' => 'fall',
            'year' => 2023,
            'broadcast' => [
                'day' => 'Sundays',
                'time' => '01:05',
                'timezone' => 'Asia/Tokyo',
                'string' => 'Sundays at 01:05 (JST)',
            ],
            'producers' => [
                [
                    'mal_id' => 1143,
                    'type' => 'anime',
                    'name' => 'TOHO animation',
                    'url' => 'https://myanimelist.net/anime/producer/1143/TOHO_animation',
                ],
            ],
            'licensors' => [
                [
                    'mal_id' => 1468,
                    'type' => 'anime',
                    'name' => 'Crunchyroll',
                    'url' => 'https://myanimelist.net/anime/producer/1468/Crunchyroll',
                ],
            ],
            'studios' => [
                [
                    'mal_id' => 28,
                    'type' => 'anime',
                    'name' => 'OLM',
                    'url' => 'https://myanimelist.net/anime/producer/28/OLM',
                ],
            ],
            'genres' => [
                [
                    'mal_id' => 8,
                    'type' => 'anime',
                    'name' => 'Drama',
                    'url' => 'https://myanimelist.net/anime/genre/8/Drama',
                ],
                [
                    'mal_id' => 7,
                    'type' => 'anime',
                    'name' => 'Mystery',
                    'url' => 'https://myanimelist.net/anime/genre/7/Mystery',
                ],
            ],
            'explicit_genres' => [],
            'themes' => [
                [
                    'mal_id' => 67,
                    'type' => 'anime',
                    'name' => 'Medical',
                    'url' => 'https://myanimelist.net/anime/genre/67/Medical',
                ],
            ],
            'demographics' => [],
        ],
    ];

    // /**
    //  * @return array<int, AnimeData>
    //  */
    public function fetchNowAiring(int $limit = 12, string $forPage = 'home')
    {
        // try {
        //     $dataFromDb = $this->animeRepository->getAiringData($limit);

        //     if ($dataFromDb->count() > 0) {
        //         $mappedDbData = $dataFromDb->map(fn($item) => AnimeData::fromDatabase($item))->all();
        //         return $mappedDbData;
        //     }

        //     // Fallback to API
        //     $response = Http::withQueryParameters([
        //         'limit' => $limit,
        //     ])->get(config('app.jikan_url') . '/seasons/now');

        //     if ($response->failed()) {
        //         Log::warning("Fetching Jikan API failed for now airing. Status: {$response->status()}", [
        //             'body' => $response->body(),
        //         ]);
        //         $response->throw();
        //     }

        //     $apiPayload = $response->json();
        //     $animeDataDtos = [];

        //     if (isset($apiPayload['data']) && is_array($apiPayload['data'])) {

        //         $animeDataDtos = collect($apiPayload['data'])
        //             ->unique('mal_id')
        //             ->map(fn(array $item) => AnimeData::fromArray($item))
        //             ->values()
        //             ->all();

        //         $this->bulkInsertAnimeWithMetaData($animeDataDtos);
        //     }

        //     return $animeDataDtos;
        // } catch (Exception $e) {
        //     Log::error('Failed to fetch Now Airing anime: ' . $e->getMessage());
        //     throw $e;
        // }

        $dummyDtos = collect($this->dummy)
            ->map(fn(array $item) => AnimeData::fromArray($item))->values()->all();
        // dd($dummyDtos);
        $this->bulkInsertAnimeWithMetaData($dummyDtos);
    }

    /**
     * @param  array<AnimeData>  $animeApiData
     */
    public function bulkInsertAnimeWithMetaData(array $animeApiData): void
    {
        $buildedAnimeRecords = $this->buildAnimeRecords($animeApiData);

        Anime::insertOrIgnore($buildedAnimeRecords['animeRecords']);

        $insertedAnimeRecords = Anime::whereIn('mal_id', $buildedAnimeRecords['animeMalIds'])->get();

        $this->processAndInsertAnimeMetadata(
            animeApiData: $animeApiData,
            insertedAnimeRecords: $insertedAnimeRecords,
            apiProperty: 'demographics',
            relatedModel: Demographic::class,
            pivotModel: AnimeDemographic::class,
            pivotForeignKey: 'demographic_id'
        );

        $this->processAndInsertAnimeMetadata(
            animeApiData: $animeApiData,
            insertedAnimeRecords: $insertedAnimeRecords,
            apiProperty: 'genres',
            relatedModel: Genre::class,
            pivotModel: AnimeGenre::class,
            pivotForeignKey: 'genre_id'
        );

        $this->processAndInsertAnimeMetadata(
            animeApiData: $animeApiData,
            insertedAnimeRecords: $insertedAnimeRecords,
            apiProperty: 'producers',
            relatedModel: Producer::class,
            pivotModel: AnimeProducer::class,
            pivotForeignKey: 'producer_id'
        );

        $this->processAndInsertAnimeMetadata(
            animeApiData: $animeApiData,
            insertedAnimeRecords: $insertedAnimeRecords,
            apiProperty: 'studios',
            relatedModel: Studio::class,
            pivotModel: AnimeStudio::class,
            pivotForeignKey: 'studio_id'
        );

        $this->processAndInsertAnimeMetadata(
            animeApiData: $animeApiData,
            insertedAnimeRecords: $insertedAnimeRecords,
            apiProperty: 'themes',
            relatedModel: Theme::class,
            pivotModel: AnimeTheme::class,
            pivotForeignKey: 'theme_id'
        );
    }

    /**
     * @param  array<AnimeData>  $animeApiData
     */
    private function buildAnimeRecords(array $animeApiData)
    {
        $animeRecordsToInsert = [];
        $animeMalIds = [];
        foreach ($animeApiData as $apiAnime) {
            $animeRecordsToInsert[] = [
                'mal_id' => $apiAnime->mal_id,
                'url' => $apiAnime->url,
                'season' => $apiAnime->season,
                'year' => $apiAnime->year,
                'images' => json_encode($apiAnime->images),
                'trailer' => json_encode($apiAnime->trailer),
                'approved' => $apiAnime->approved,
                'titles' => json_encode($apiAnime->titles),
                'title' => $apiAnime->title,
                'title_english' => $apiAnime->title_english,
                'title_japanese' => $apiAnime->title_japanese,
                'title_synonyms' => json_encode($apiAnime->title_synonyms),
                'type' => $apiAnime->type,
                'source' => $apiAnime->source,
                'episodes' => $apiAnime->episodes,
                'status' => $apiAnime->status,
                'airing' => $apiAnime->airing,
                'aired' => json_encode($apiAnime->aired),
                'duration' => $apiAnime->duration,
                'rating' => $apiAnime->rating,
                'score' => $apiAnime->score,
                'synopsis' => $apiAnime->synopsis,
                'background' => $apiAnime->background,
                'created_at' => now(),
            ];

            $animeMalIds[] = $apiAnime->mal_id;
        }

        return [
            'animeRecords' => $animeRecordsToInsert,
            'animeMalIds' => $animeMalIds
        ];
    }

    /**
     * Extracts, inserts, and maps related metadata (genres, demographics, etc.) for the anime payload.
     *
     * @param array<int, AnimeData> $animeApiData
     * @param Collection<int, \stdClass> $insertedAnimeRecords
     * @param string $apiProperty The key from the Jikan API (e.g., 'genres', 'demographics')
     * @param class-string<Model> $relatedModel The Eloquent model class for the entity (e.g., Genre::class)
     * @param class-string<Model> $pivotModel The Eloquent model class for the pivot table (e.g., AnimeGenre::class)
     * @param string $pivotForeignKey The column name in the pivot table (e.g., 'genre_id')
     */
    private function processAndInsertAnimeMetadata(
        array $animeApiData,
        Collection $insertedAnimeRecords,
        string $apiProperty,
        string $relatedModel,
        string $pivotModel,
        string $pivotForeignKey
    ): void {
        $relatedModelDatas = [];
        $malAnimeIdWithPivotData = [];

        foreach ($animeApiData as $apiData) {
            if (empty($apiData->$apiProperty)) {
                continue;
            }

            foreach ($apiData->$apiProperty as $property) {
                $malAnimeIdWithPivotData[$apiData->mal_id][] = $property->mal_id;
                $relatedModelDatas[$property->mal_id] = [
                    'mal_id' => $property->mal_id,
                    'type' => $property->type,
                    'name' => $property->name,
                    'url' => $property->url,
                    'created_at' => now()
                ];
            }
        }

        $relatedModel::insertOrIgnore($relatedModelDatas);

        $insertedRelatedDatas = $relatedModel::whereIn('mal_id', array_keys($relatedModelDatas))->get();
        $relatedIdsLookup = $insertedRelatedDatas->pluck('id', 'mal_id')->toArray();

        $pivotTableDatas = [];
        foreach ($insertedAnimeRecords as $dbAnimeRecord) {
            if (!isset($malAnimeIdWithPivotData[$dbAnimeRecord->mal_id])) {
                continue;
            }
            foreach ($malAnimeIdWithPivotData[$dbAnimeRecord->mal_id] as $malId) {
                $pivotTableDatas[] = [
                    'anime_id' => $dbAnimeRecord->id,
                    $pivotForeignKey => $relatedIdsLookup[$malId]
                ];
            }
        }

        $pivotModel::insertOrIgnore($pivotTableDatas);
    }

    /**
     * Fetch top anime.
     *
     * @return array{data: array<int, AnimeData>}
     */
    public function fetchTopAnime(int $limit = 8): array
    {
        try {
            return Cache::remember("top_anime_limit:{$limit}", 3600, function () use ($limit) {
                $response = Http::timeout(10)->withQueryParameters([
                    'limit' => $limit,
                ])->get(config('app.jikan_url') . '/top/anime');

                if ($response->failed()) {
                    Log::warning("Jikan API failed for Top Anime. Status: {$response->status()}");
                    $response->throw();
                }

                $animeData = $response->json();

                if (isset($animeData['data']) && is_array($animeData['data'])) {
                    $animeData = collect($animeData['data'])
                        ->unique('mal_id')
                        ->map(fn(array $item) => AnimeData::fromArray($item))
                        ->values()
                        ->all();
                }

                return $animeData;
            });
        } catch (Exception $e) {
            Log::error('Failed to fetch Top Anime: ' . $e->getMessage());

            return ['data' => []];
        }
    }
}
