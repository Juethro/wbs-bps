<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\pengaduan;
use App\Models\status_history;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    /**
     * Display Dashboard Each Roles
     */
    public function admin()
    {
        return Inertia::render('Dashboard'); 
    }

    public function kurator()
    {
        dd('ini dashboard kurator');
    }

    public function validator()
    {
        dd('ini dashboard validator');
    }

    public function dewan()
    {
        dd('ini dashboard dewan');
    }

    
}
