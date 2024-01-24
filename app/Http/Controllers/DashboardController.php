<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Dashboard'); 
    }

    public function humas()
    {
        dd('ini dashboard humas');
    }

    public function direksi()
    {
        dd('ini dashboard direksi');
    }

    public function dewan()
    {
        dd('ini dashboard dewan');
    }

}
