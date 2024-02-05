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
            $table->string('ticketID')->primary();
            $table->string('email');
            $table->string('nama');
            $table->string('no_telp');
            $table->string('nama_pelanggar');
            $table->string('tempat_kejadian');
            $table->date('tanggal_kejadian');
            $table->enum('jenis_masalah', ['0','1'])->default('0');
            $table->text('deskripsi_masalah');
            $table->json('lampiran_file')->nullable(); 
            $table->enum('form_status', ['0','1'])->default('0');
            $table->enum('review', ['1','2','3','4','5','6','7'])->default('1');
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
