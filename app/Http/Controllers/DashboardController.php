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
        return Inertia::render('DashboardAdmin'); 
    }

    public function kurator()
    {
        return Inertia::render('DashboardReviewer');
    }

    public function validator()
    {
        return Inertia::render('DashboardValidator');
    }

    public function dewan()
    {
        dd('ini dashboard dewan');
    }

    
}
