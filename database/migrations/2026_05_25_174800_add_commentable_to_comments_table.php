<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            // Add polymorphic columns
            $table->string('commentable_type')->after('id')->default('anime');
            $table->unsignedBigInteger('commentable_id')->after('commentable_type');

            $table->index(['commentable_type', 'commentable_id']);
        });

        // Migrate existing anime_id data
        DB::table('comments')->update([
            'commentable_type' => 'anime',
            'commentable_id'   => DB::raw('anime_id'),
        ]);

        Schema::table('comments', function (Blueprint $table) {
            $table->dropForeign(['anime_id']);
            $table->dropColumn('anime_id');

            // Remove the default now that data is migrated
            $table->string('commentable_type')->default(null)->change();
        });
    }

    public function down(): void
    {
        Schema::table('comments', function (Blueprint $table) {
            $table->foreignId('anime_id')->nullable()->constrained()->cascadeOnDelete();
        });

        DB::table('comments')
            ->where('commentable_type', 'anime')
            ->update(['anime_id' => DB::raw('commentable_id')]);

        Schema::table('comments', function (Blueprint $table) {
            $table->dropIndex(['commentable_type', 'commentable_id']);
            $table->dropColumn(['commentable_type', 'commentable_id']);
        });
    }
};
