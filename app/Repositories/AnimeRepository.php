<?php

namespace App\Repositories;

use DB;
use Exception;
use Log;

class AnimeRepository
{
    public function create()
    {
        try {
            DB::beginTransaction();

            $anime = DB::table('animes')->insertGetId([]);

            DB::commit();
        } catch (Exception $e) {
            DB::rollback();
            Log::error('Failed to create new anime data'.$e);
            throw $e;
        }
    }
}
