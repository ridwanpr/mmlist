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
            $table->dateTime('from')->nullable();
            $table->dateTime('to')->nullable();
            $table->string('from_to_string')->nullable();

            $table->index(['from', 'to']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('animes', function (Blueprint $table) {
            $table->dropIndex(['from', 'to']);
            $table->dropColumn(['from', 'to', 'from_to_string']);
        });
    }
};
