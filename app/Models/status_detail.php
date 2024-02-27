<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class status_detail extends Model
{
    use HasFactory;

    protected $table = 'status_details';

    protected $fillable = [
        'description',
        'file',
    ];
}
