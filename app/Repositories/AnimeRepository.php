<?php

namespace App\Repositories;

use App\DTOs\AnimeMetaData;
use Illuminate\Support\Facades\DB;

class AnimeRepository
{
    public function findOne(int $animeId)
    {
        return DB::table('animes')->where('id', $animeId)->first();
    }

    public function findOneWithMetaData(int $animeId)
    {
        $anime = $this->findOne($animeId);

        $anime->titles = DB::table('anime_titles')->where('anime_id', $animeId)->get();
        $anime->themes = DB::table('anime_themes')->where('anime_id', $animeId)->get();
        $anime->studios = DB::table('anime_studios')->where('anime_id', $animeId)->get();
        $anime->producers = DB::table('anime_producers')->where('anime_id', $animeId)->get();
        $anime->demographics = DB::table('anime_demographics')->where('anime_id', $animeId)->get();
        $anime->genres = DB::table('anime_genres')->where('anime_id', $animeId)->get();

        return $anime;
    }

    public function getAiringData($limit = 8)
    {
        return DB::table('animes')->where('airing', true)->limit($limit)->get();
    }

    public function insert(array $animeData): void
    {
        DB::table('animes')->insertOrIgnore($animeData);
    }

    public function getAnimeMapFromMalId(array $malIds)
    {
        return DB::table('animes')
            ->whereIn('mal_id', $malIds)
            ->get();
    }

    public function findDemographicsIds(array $demographicId)
    {
        return DB::table('demographics')->whereIn('mal_id', $demographicId)
            ->get();
    }

    /** @param array<AnimeMetaData> $data */
    public function insertDemographic(array $data)
    {
        DB::table('demographics')->insertOrIgnore($data);
    }

    /** @param array<string, mixed> $data */
    public function insertAnimeDemographic(array $data)
    {
        DB::table('anime_demographics')->insertOrIgnore($data);
    }
}
