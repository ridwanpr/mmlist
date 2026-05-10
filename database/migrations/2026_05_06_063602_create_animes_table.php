<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('animes', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('mal_id')->unique();
            $table->string('url', 500)->unique();

            $table->enum('season', ['summer', 'winter', 'spring', 'fall'])->nullable();
            $table->unsignedSmallInteger('year')->nullable();

            $table->json('images')->nullable();
            $table->json('trailer')->nullable();
            $table->boolean('approved')->index();

            $table->json('titles')->nullable();

            $table->string('title')->index();
            $table->string('title_english')->nullable()->index();
            $table->string('title_japanese')->nullable()->index();
            $table->json('title_synonyms')->nullable();

            $table->string('type')->nullable()->index();
            $table->string('source')->nullable();
            $table->unsignedSmallInteger('episodes')->nullable();
            $table->string('status')->nullable()->index();
            $table->boolean('airing')->index();

            $table->json('aired')->nullable();

            $table->string('duration')->nullable();
            $table->string('rating')->nullable()->index();
            $table->decimal('score', 4, 2)->nullable()->index();

            $table->text('synopsis')->nullable();
            $table->text('background')->nullable();
            $table->unsignedInteger('rank')->nullable();

            $table->timestamps();

            $table->index(['year', 'season']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('animes');
    }
};
