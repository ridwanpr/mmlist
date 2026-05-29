<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('animes', function (Blueprint $table) {
            $table->dropIndex('animes_staff_pick_index');
            $table->dropIndex('animes_airing_index');
            $table->dropIndex('animes_approved_index');
            $table->dropIndex('animes_status_index');
            $table->dropIndex('animes_type_index');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('animes', function (Blueprint $table) {
            $table->index('staff_pick', 'animes_staff_pick_index');
            $table->index('airing', 'animes_airing_index');
            $table->index('approved', 'animes_approved_index');
            $table->index('status', 'animes_status_index');
            $table->index('type', 'animes_type_index');
        });
    }
};
