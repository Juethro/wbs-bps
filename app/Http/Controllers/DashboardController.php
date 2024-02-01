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

    /**
     * Validator Utilities
     */

    public function approveLaporanValidator($ticket)
    {
        /**
         * - Mengubah review di Database
        * - Mail Notifikasi
        * - Simpan Histori Review
        */
    }

    public function editLaporan(Request $request, $ticket)
    {
        /**
         * - Validasi Request
         * - Membuat Mail Notifikasi menggunakan Request (Instruksi dari validator)
         * - Update status editable
         * - Simpan Histori Review
         */


    }


    /** 
     * Kurator Utilities
     */

    public function approveLaporanKurator(Request $request, $ticket)
    {
        /**
         * - Validasi Request
         * - Mengubah review di database
         * - Menyimpan Multiple File + simpan catatan
         * - Simpan Histori review
         * - Email Notifikasi
         */
    }

    public function deniedLaporanKurator($ticket)
    {
        /**
         * - Validasi Request
         * - Mengubah review di database
         * - Email Notifikasi
         */
    }

    /**
     * Dewan Utilities
     */

    public function approveLaporanDewan(Request $request, $ticket)
    {
        /**
         * - Validasi Request
         * - Mengubah review di database
         * - Menyimpan Multiple File
         * - Simpan Histori Review
         * - Email Notifikasi
         */
    }

    public function beyondOurJurisdiction($ticket)
    {
        /**
         * - Mengubah review di Database
         * - Mail Notifikasi
         * - Simpan Histori Review
         */
    }

    public function deniedLaporanDewan(Request $request, $ticket)
    {
        /**
         * - Mengubah review di Database
         * - Mail Notifikasi
         * - Simpan Histori Review
         */

        
    }

    public function continue(Request $request, $ticket)
    {
        
    }
}
