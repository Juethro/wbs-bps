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
        Schema::create('pengaduan', function (Blueprint $table) {
            $table->increments('Id');
            $table->string('email')->unique();
            $table->string('nama');
            $table->string('no telp');
            $table->string('jenis masalah');
            $table->string('deskripsi masalah');
            $table->string('lampiran_nama')->nullable(); 
            $table->string('lampiran_media')->nullable(); 
            $table->timestamp('tanggal_perubahan')->useCurrent();
            $table->enum('review', ['A', 'B', 'C']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengaduan');
    }
};
