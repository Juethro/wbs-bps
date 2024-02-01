<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class FormController extends Controller
{
    function home()
    {
        return Inertia::render('FormPengaduan');
    }

    function pengaduan()
    {
        return Inertia::render('FormPengaduan');
    }

    function status()
    {
        return Inertia::render('FormStatus');
    }

    function track(Request $request)
    {
        /**
         * - Validasi Request
         * - Return Data dari Database
         */
    }

    function submitStore(Request $request)
    {
        /**
         * - Validasi Request
         * - Simpan file dan path file tersebut 
         */
        
    }

    function submitRevision(Request $request)
    {
        /**
         * - Validasi Request
         * - Update database
         */

    }

    function dashboard()
    {
        return Inertia::render('Dashboard');
    }

    function showLogin()
    {
        return Inertia::render('LoginAdmin');
    }

    // function cobaUser()
   // {
      //  return Inertia::render('UserCoba');
   // }
}
