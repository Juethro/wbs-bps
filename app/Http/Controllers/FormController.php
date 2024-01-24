<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{
    function Index()
    {
        return Inertia::render('FormPengaduan');
    }

    function Status()
    {
        return Inertia::render('FormStatus');
    }
}
