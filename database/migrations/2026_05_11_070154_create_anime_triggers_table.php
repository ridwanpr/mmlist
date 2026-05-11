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
        Schema::create('anime_triggers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('trigger_id')->constrained('master_triggers');
            $table->foreignId('anime_id')->constrained('animes');
            $table->foreignId('user_id')->constrained('users');
            $table->boolean('is_appear');
            $table->enum('severity', ['Mild', 'Moderate', 'Severe', 'Extreme'])->nullable();
            $table->enum('framing', ['Treated seriously', 'Just exists', 'Romanticized', 'Used as comedy'])->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('anime_triggers');
    }
};
