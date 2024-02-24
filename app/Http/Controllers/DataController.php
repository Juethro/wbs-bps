<?php

namespace App\Http\Controllers;

use App\Models\pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class DataController extends Controller
{
    function fetchData()
    {
        $pengaduandata = json_decode(pengaduan::all());
        $pengaduandata[0]->lampiran_file = json_decode($pengaduandata[0]->lampiran_file);

        return response()->json($pengaduandata);
    }

    function downloadFile(String $ticket, String $uniqueId)
    {
        $aduan = pengaduan::where('ticketID', $ticket)->first();
        $pathArray = json_decode($aduan->lampiran_file, true);

        $path = array_column(
            array_filter($pathArray, fn($file) => $file['uniqueId'] === $uniqueId),
            'path'
        )[0] ?? null;

        return Storage::download($path);
    }

    // public function updateReview(Request $request)
    // {
    //     // Validasi data yang diterima dari permintaan
    //     $request->validate([
    //         'ticketID' => 'required|exists:pengaduan,ticketID', // Pastikan ticketID ada di tabel pengaduan
    //         'review' => 'required|in:0,1,2,3,4', // Pastikan review memiliki nilai yang valid
    //     ]);

    //     // Temukan pengaduan berdasarkan ticketID
    //     $pengaduan = Pengaduan::where('ticketID', $request->ticketID)->first();

    //     // Perbarui nilai review pengaduan
    //     $pengaduan->review = $request->review;
    //     $pengaduan->save();

    //     // Berikan respons sukses
    //     return response()->json(['message' => 'Review berhasil diperbarui'], 200);
    // }

    /**
     * Validator Utilities
     */

     public function approveLaporanValidator(Request $request, String $ticket)
     {
         /**
          * - Mengubah review di Database
          * - Mail Notifikasi
          * - Simpan Histori Review
          */
          dd($ticket);
     }
 
     public function revisiLaporan(Request $request, $ticket)
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
 
     public function deniedLaporanDewan(Request $request, $ticket)
     {
         /**
          * - Mengubah review di Database
          * - Mail Notifikasi
          * - Simpan Histori Review
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
 
     public function continue(Request $request, $ticket)
     {
         /**
          * - Meneruskan Hasil penyelidikan + tindak lanjut dari atas
          * - Mail Notifikasi
          */
     }
}