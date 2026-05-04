<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->string('name')->unique();
            $table->string('description')->nullable();
            $table->timestamps();
        });

        $roleData = [
            [
                'id' => 'admin',
                'name' => 'Admin',
                'description' => 'Admin roles',
            ],
            [
                'id' => 'user',
                'name' => 'User',
                'description' => 'User roles',
            ],
            [
                'id' => 'moderator',
                'name' => 'Moderator',
                'description' => 'Moderator roles',
            ],
        ];

        DB::table('roles')->insert($roleData);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
