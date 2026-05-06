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
        Schema::create('animes', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('mal_id');
            $table->string('url');

            $table->enum('season', ['summer', 'winter', 'spring', 'fall'])->nullable();
            $table->integer('year')->nullable();

            $table->json('images')->nullable();
            $table->json('trailer')->nullable();
            $table->boolean('approved');

            $table->json('titles')->nullable();

            $table->string('title');
            $table->string('title_english')->nullable();
            $table->string('title_japanese')->nullable();
            $table->json('title_synonyms')->nullable();

            $table->string('type')->nullable();
            $table->string('source')->nullable();
            $table->integer('episodes')->nullable();
            $table->string('status')->nullable();
            $table->boolean('airing');

            $table->json('aired')->nullable();

            $table->string('duration')->nullable();
            $table->string('rating')->nullable();
            $table->decimal('score', 4, 2)->nullable();

            $table->text('synopsis')->nullable();
            $table->text('background')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('animes');
    }
};
