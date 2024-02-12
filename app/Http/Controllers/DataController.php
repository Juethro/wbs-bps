<?php

namespace App\Http\Controllers;

use App\Models\pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DataController extends Controller
{
    function fetchData()
    {
        $pengaduandata = pengaduan::all();

        return response()->json($pengaduandata);
    }
}