<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement("ALTER TABLE animes ADD COLUMN is_tv_priority TINYINT(1) GENERATED ALWAYS AS (IF(IFNULL(type, '') = 'TV', 1, 0)) STORED");

        DB::statement("ALTER TABLE animes ADD COLUMN is_not_hentai TINYINT(1) GENERATED ALWAYS AS (IF(IFNULL(rating, '') = 'Rx - Hentai', 0, 1)) STORED");

        DB::statement('ALTER TABLE animes ADD INDEX animes_browse_perf_index (is_not_hentai, is_tv_priority, year, airing, score)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('ALTER TABLE animes DROP INDEX animes_browse_perf_index');
        DB::statement('ALTER TABLE animes DROP COLUMN is_tv_priority');
        DB::statement('ALTER TABLE animes DROP COLUMN is_not_hentai');
    }
};
