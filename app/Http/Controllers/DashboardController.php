<?php

namespace App\Http\Controllers;

use Inertia\Inertia;


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
        return Inertia::render('DashboardKurator');
    }

    public function validator()
    {
        return Inertia::render('DashboardValidator');
    }

    public function dewan()
    {
        return Inertia::render('DashboardDewan');
    }

    
}
