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
        Schema::create('status_histories', function (Blueprint $table) {
            $table->id();
            $table->string('ticketID');
            $table->enum('review',[1,2,3,4,5,6,7,8,9]);
            $table->unsignedBigInteger('detail_id');
            $table->timestamps();
            $table->foreign('ticketID')->references('ticketID')->on('pengaduan');
            $table->foreign('detail_id')->references('detail_id')->on('status_details');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('status_histories');
    }
};
