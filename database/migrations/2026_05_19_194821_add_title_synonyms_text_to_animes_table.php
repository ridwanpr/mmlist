<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('animes', function (Blueprint $table) {
            $table->text('title_synonyms_text')->nullable()->after('title_synonyms');
        });

        DB::table('animes')->whereNotNull('title_synonyms')->chunkById(1000, function ($animes) {
            foreach ($animes as $anime) {
                $synonyms = json_decode($anime->title_synonyms, true);

                if (is_array($synonyms) && !empty($synonyms)) {
                    DB::table('animes')
                        ->where('id', $anime->id)
                        ->update(['title_synonyms_text' => implode(' ', $synonyms)]);
                }
            }
        });

        Schema::table('animes', function (Blueprint $table) {
            $table->dropFullText('animes_title_title_english_title_japanese_fulltext');
            $table->fullText(
                ['title', 'title_english', 'title_japanese', 'title_synonyms_text'],
                'animes_search_fulltext'
            );
        });
    }

    public function down(): void
    {
        Schema::table('animes', function (Blueprint $table) {
            $table->dropFullText('animes_search_fulltext');

            $table->fullText(
                ['title', 'title_english', 'title_japanese'],
                'animes_title_title_english_title_japanese_fulltext'
            );

            $table->dropColumn('title_synonyms_text');
        });
    }
};
