<?php

namespace App\Repositories;

use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use stdClass;

class AnimeRepository
{
    public function findOne(int $animeId): ?stdClass
    {
        return DB::table('animes')->where('id', $animeId)->first();
    }

    public function findOneWithMetaData(int $animeId): ?stdClass
    {
        $anime = $this->findOne($animeId);

        if ($anime) {
            $anime->titles = DB::table('anime_titles')->where('anime_id', $animeId)->get();
            $anime->themes = DB::table('anime_themes')->where('anime_id', $animeId)->get();
            $anime->studios = DB::table('anime_studios')->where('anime_id', $animeId)->get();
            $anime->producers = DB::table('anime_producers')->where('anime_id', $animeId)->get();
            $anime->demographics = DB::table('anime_demographics')->where('anime_id', $animeId)->get();
            $anime->genres = DB::table('anime_genres')->where('anime_id', $animeId)->get();
        }

        return $anime;
    }

    /**
     * @return Collection<int, stdClass>
     */
    public function getAiringData(int $limit = 8): Collection
    {
        return DB::table('animes')->where('airing', true)->limit($limit)->get();
    }

    /**
     * @param  list<array<string, mixed>>  $animeData
     */
    public function insert(array $animeData): void
    {
        DB::table('animes')->insertOrIgnore($animeData);
    }

    /**
     * @param  array<int>  $malIds
     * @return Collection<int, stdClass>
     */
    public function getAnimeMapFromMalId(array $malIds): Collection
    {
        return DB::table('animes')
            ->whereIn('mal_id', $malIds)
            ->get();
    }

    /**
     * @param  array<int>  $demographicId
     * @return Collection<int, stdClass>
     */
    public function findDemographicsIds(array $demographicId): Collection
    {
        return DB::table('demographics')
            ->whereIn('mal_id', $demographicId)
            ->get();
    }

    /**
     * @param  list<array<string, mixed>>  $data
     */
    public function insertDemographic(array $data): void
    {
        DB::table('demographics')->insertOrIgnore($data);
    }

    /**
     * @param  list<array<string, mixed>>  $data
     */
    public function insertAnimeDemographic(array $data): void
    {
        DB::table('anime_demographics')->insertOrIgnore($data);
    }
}
