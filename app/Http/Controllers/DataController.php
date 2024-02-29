<?php

namespace App\Http\Controllers;

use App\Models\pengaduan;
use App\Models\email;
use App\Models\status_detail;
use App\Models\status_history;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\EmailController;
use Illuminate\Support\Facades\Date;

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

    // Archived
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

     public function approveLaporanValidator(Request $request)
     {
         /**
          * - Mengubah review di Database
          * - Mail Notifikasi
          * - Simpan Histori Review
          */

        
        // Mengubah Review
        $ticket = $request->getContent();
        $jenis = pengaduan::where('ticketID', $ticket)->first()->pluck('review'); // Cek apakah Administratif/ Teknis
        if($jenis === 1){
            pengaduan::where('ticketID', $ticket)->update(['review'=> '4']);
        } else{
            pengaduan::where('ticketID', $ticket)->update(['review'=> '5']);
        }

        // Mail Notifikasi Pelapor
        $tujuan_pelapor = pengaduan::where('ticketID', $ticket)->first()->pluck('email');
        $tanggal = Date::now()->format('d/m/y');
        $mail = new EmailController();
        if($jenis === 1){
            $mail->pelapor_email($ticket, 4, $tanggal, $tujuan_pelapor[0]);
        }else{
            $mail->pelapor_email($ticket, 5, $tanggal, $tujuan_pelapor[0]);
        }
        

        // Mail Notifikasi Reviewer
        $tujuan_reviewer = email::where('role', 'validator')->pluck('email');
        if($jenis === 1){
            foreach ($tujuan_reviewer as $email) {
                $mail->reviewer_email($ticket, 4, $email);
            }
        } else{
            foreach ($tujuan_reviewer as $email) {
                $mail->reviewer_email($ticket, 5, $email);
            }
        }

        // Simpan Histori Review
        $statusDetail = new status_detail();
        $statusDetail->description = 'Laporan sedang dalam proses investigasi';
        $statusDetail->save();

        $statusHistory = new status_history();
        $statusHistory->ticketID = $ticket;
        $statusHistory->review = '4';
        $statusHistory->detail_id = $statusDetail->id; // Menggunakan ID dari status_details yang baru saja dimasukkan
        $statusHistory->save();

        return redirect()->route('dashboard.admin');
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