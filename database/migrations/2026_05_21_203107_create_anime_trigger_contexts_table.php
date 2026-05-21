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
        Schema::create('anime_trigger_contexts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('anime_id')->constrained('animes')->cascadeOnDelete();
            $table->foreignId('trigger_content_id')->constrained('trigger_contents')->cascadeOnDelete();
            $table->text('ai_summary')->nullable();
            $table->timestamps();
            $table->unique(['anime_id', 'trigger_content_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anime_trigger_contexts');
    }
};
