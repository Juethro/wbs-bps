<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class status_history extends Model
{
    use HasFactory;

    protected $table = 'status_histories';

    protected $primaryKey = 'id';

    protected $fillable = ['ticketID', 'review', 'created_at'];

    public function pengaduan()
    {
        return $this->belongsTo(pengaduan::class, 'ticketID', 'ticketID');
    }

    public function statusDetail()
    {
        return $this->belongsTo(status_detail::class, 'detail_id', 'detail_id');
    }
}
