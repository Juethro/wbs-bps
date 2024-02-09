<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Note:
     * - Role 1 = 'Tim Kurator'
     * - Role 2 = 'Tim Dewan'
     * - Role 3 = 'Tim Validator'
     */
    public function up(): void
    {
        Schema::create('emails', function (Blueprint $table) {
            $table->id();
            $table->string('email')->unique();
            $table->enum('role', ['kurator', 'validator', 'dewan'])->default('kurator');
            $table->timestamps();
        });
    }


    public function down(): void
    {
        Schema::dropIfExists('emails');
    }
};
