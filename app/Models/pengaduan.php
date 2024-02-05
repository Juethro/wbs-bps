<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class pengaduan extends Model
{
    use HasFactory;

    protected $table = 'pengaduan';

    protected $fillable = [
        'ticketID',
        'email',
        'nama',
        'no_telp',
        'nama_pelanggar',
        'tempat_kejadian',
        'tanggal_kejadian',
        'jenis_masalah',
        'deskripsi_masalah',
        'lampiran_file',
        'form_status',
        'review',
    ];

    function statusHistories()
    {
        return $this->hasMany(status_history::class);
    }
}
