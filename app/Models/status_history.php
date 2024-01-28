<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class status_history extends Model
{
    use HasFactory;

    protected $table = 'status_histories';

    protected $primaryKey = 'id';

    protected $fillable = ['ticketID', 'review'];

    public function pengaduan()
    {
        return $this->belongsTo(pengaduan::class, 'ticketID');
    }
}
