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
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Date;

class DataController extends Controller
{
    function fetchData()
    {
        $pengaduandata = json_decode(pengaduan::all());
        $pengaduandata = array_map(function ($pengaduan) {
            $pengaduan->lampiran_file = json_decode($pengaduan->lampiran_file);
            return $pengaduan;
        }, $pengaduandata);

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

        return to_route('dashboard.validator');
     }
 
     public function revisiLaporan(Request $request)
     {
         /**
          * - Validasi Request
          * - Membuat Mail Notifikasi menggunakan Request (Instruksi dari validator)
          * - Update status editable
          * - Simpan Histori Review
          */

        $validator = Validator::make($request->all(), [
            'ticket' => 'required',
            'instruksi' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validate();
        
        // Save status_histori
        $statusDetail = new status_detail();
        $statusDetail->description = $validated['instruksi'];
        $statusDetail->save();

        $history = new status_history();
        $history->ticketID = $validated['ticket'];
        $history->review = '3';
        $history->detail_id = $statusDetail->id;
        $history->save();

        // Mail Pelapor
        $tanggal = Date::now()->format('d/m/y');
        $tujuan_pelapor = pengaduan::where('ticketID', $validated['ticket'])->pluck('email');
        $mail = new EmailController();
        $mail->pelapor_email($validated['ticket'], 3, $tanggal, $tujuan_pelapor[0], $validated['instruksi']);

        // Update form_status, review (pengaduan)
        pengaduan::where('ticketID', $validated['ticket'])->update(['review'=> '3']);
        pengaduan::where('ticketID', $validated['ticket'])->update(['form_status'=> '1']);
        
        return to_route('dashboard.validator');
     }
 
 
     /** 
      * Kurator Utilities
      */
    
    public function investigateLaporanKurator(Request $request)
    {
        /**
         * - Mengubah review di database
         * - Simpan Histori review
         * - Email Notifikasi
         */
        
        $ticket = $request->getContent();
        pengaduan::where('ticketID', $ticket)->update(['review'=> '6']);

        // Save status_histori
        $statusDetail = new status_detail();
        $statusDetail->description = "Laporan Sedang Dalam Proses Investigasi";
        $statusDetail->save();

        $history = new status_history();
        $history->ticketID = $ticket;
        $history->review = '6';
        $history->detail_id = $statusDetail->id;
        $history->save();

        // Mail Pelapor
        $tanggal = Date::now()->format('d/m/y');
        $tujuan_pelapor = pengaduan::where('ticketID', $ticket)->pluck('email');
        $mail = new EmailController();
        $mail->pelapor_email($ticket, 6, $tanggal, $tujuan_pelapor[0]);

        return to_route('dashboard.kurator');
    }
 
     public function provenLaporanKurator(Request $request)
     {
         /**
          * - Validasi Request
          * - Mengubah review di database
          * - Menyimpan Multiple File + simpan catatan
          * - Simpan Histori review
          * - Email Notifikasi
          */

        // Validasi Request
        $validator = Validator::make($request->all(), [
            'ticketID' => 'required',
            'hasil_investigasi' => 'required',
            'berkas' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validate();

        // File to JSON
        $berkas = [];
        foreach ($validated['berkas'] as &$item) {
            if (isset($item) && $item instanceof UploadedFile) {
                $uniqueID = uniqid();
                $uniqueFilename = $uniqueID . '_' . $item->getClientOriginalName(); // Generate Unique Name
                $oriFileName = $item->getClientOriginalName(); // Sim
                $item->storeAs('berkas/', $uniqueFilename); // Simpan Gambar ke Storage
                
                // Simpan nama + path
                $berkas[] = [
                    'uniqueId' => $uniqueID,
                    'oriFileName' => $oriFileName,
                    'path' => 'berkas/' . $uniqueFilename,
                ];
            }
        }

        // Update Review on Pengaduan
        pengaduan::where('ticketID', $validated['ticketID'])->update(['review'=> '8']);

        // Save status_histori
        $statusDetail = new status_detail();
        $statusDetail->description = $validated['hasil_investigasi'];
        $statusDetail->file = json_encode($berkas);
        $statusDetail->save();

        $history = new status_history();
        $history->ticketID = $validated['ticketID'];
        $history->review = '8';
        $history->detail_id = $statusDetail->id;
        $history->save();

        // Mail Pelapor
        $tanggal = Date::now()->format('d/m/y');
        $tujuan_pelapor = pengaduan::where('ticketID', $validated['ticketID'])->pluck('email');
        $mail = new EmailController();
        $mail->pelapor_email($validated['ticketID'], 8, $tanggal, $tujuan_pelapor[0]);

        return to_route('dashboard.kurator');
     }
 
     public function notprovenLaporanKurator(Request $request)
     {
         /**
          * - Validasi Request
          * - Mengubah review di database
          * - Email Notifikasi
          */
        $validator = Validator::make($request->all(), [
            'ticketID' => 'required',
            'hasil_investigasi' => 'required',
            'berkas' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validate();

        // File to JSON
        $berkas = [];
        foreach ($validated['berkas'] as &$item) {
            if (isset($item) && $item instanceof UploadedFile) {
                $uniqueID = uniqid();
                $uniqueFilename = $uniqueID . '_' . $item->getClientOriginalName(); // Generate Unique Name
                $oriFileName = $item->getClientOriginalName(); // Sim
                $item->storeAs('berkas/', $uniqueFilename); // Simpan Gambar ke Storage
                
                // Simpan nama + path
                $berkas[] = [
                    'uniqueId' => $uniqueID,
                    'oriFileName' => $oriFileName,
                    'path' => 'berkas/' . $uniqueFilename,
                ];
            }
        }

        // Update Review on Pengaduan
        pengaduan::where('ticketID', $validated['ticketID'])->update(['review'=> '9']);

        // Save status_histori
        $statusDetail = new status_detail();
        $statusDetail->description = $validated['hasil_investigasi'];
        $statusDetail->file = json_encode($berkas);
        $statusDetail->save();

        $history = new status_history();
        $history->ticketID = $validated['ticketID'];
        $history->review = '9';
        $history->detail_id = $statusDetail->id;
        $history->save();

        // Mail Pelapor
        $tanggal = Date::now()->format('d/m/y');
        $tujuan_pelapor = pengaduan::where('ticketID', $validated['ticketID'])->pluck('email');
        $mail = new EmailController();
        $mail->pelapor_email($validated['ticketID'], 9, $tanggal, $tujuan_pelapor[0]);

        return to_route('dashboard.kurator');
     }
 
     /**
      * Dewan Utilities
      */

      public function investigateLaporanDewan(Request $request)
      {
          /**
           * - Mengubah review di database
           * - Simpan Histori review
           * - Email Notifikasi
           */

           $ticket = $request->getContent();
           pengaduan::where('ticketID', $ticket)->update(['review'=> '6']);
   
           // Save status_histori
           $statusDetail = new status_detail();
           $statusDetail->description = "Laporan Sedang Dalam Proses Investigasi";
           $statusDetail->save();
   
           $history = new status_history();
           $history->ticketID = $ticket;
           $history->review = '6';
           $history->detail_id = $statusDetail->id;
           $history->save();
   
           // Mail Pelapor
           $tanggal = Date::now()->format('d/m/y');
           $tujuan_pelapor = pengaduan::where('ticketID', $ticket)->pluck('email');
           $mail = new EmailController();
           $mail->pelapor_email($ticket, 6, $tanggal, $tujuan_pelapor[0]);
   
           return to_route('dashboard.dewan');
  
      }
 
     public function approveLaporanDewan(Request $request, $ticket)
     {
         /**
          * - Validasi Request
          * - Mengubah review di database
          * - Menyimpan Multiple File
          * - Simpan Histori Review
          * - Email Notifikasi
          */

          $validator = Validator::make($request->all(), [
            'ticketID' => 'required',
            'hasil_investigasi' => 'required',
            'berkas' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validate();

        // File to JSON
        $berkas = [];
        foreach ($validated['berkas'] as &$item) {
            if (isset($item) && $item instanceof UploadedFile) {
                $uniqueID = uniqid();
                $uniqueFilename = $uniqueID . '_' . $item->getClientOriginalName(); // Generate Unique Name
                $oriFileName = $item->getClientOriginalName(); // Sim
                $item->storeAs('berkas/', $uniqueFilename); // Simpan Gambar ke Storage
                
                // Simpan nama + path
                $berkas[] = [
                    'uniqueId' => $uniqueID,
                    'oriFileName' => $oriFileName,
                    'path' => 'berkas/' . $uniqueFilename,
                ];
            }
        }

        // Update Review on Pengaduan
        pengaduan::where('ticketID', $validated['ticketID'])->update(['review'=> '8']);

        // Save status_histori
        $statusDetail = new status_detail();
        $statusDetail->description = $validated['hasil_investigasi'];
        $statusDetail->file = json_encode($berkas);
        $statusDetail->save();

        $history = new status_history();
        $history->ticketID = $validated['ticketID'];
        $history->review = '8';
        $history->detail_id = $statusDetail->id;
        $history->save();

        // Mail Pelapor
        $tanggal = Date::now()->format('d/m/y');
        $tujuan_pelapor = pengaduan::where('ticketID', $validated['ticketID'])->pluck('email');
        $mail = new EmailController();
        $mail->pelapor_email($validated['ticketID'], 8, $tanggal, $tujuan_pelapor[0]);

        return to_route('dashboard.kurator');
     }
 
     public function deniedLaporanDewan(Request $request, $ticket)
     {
         /**
          * - Mengubah review di Database
          * - Mail Notifikasi
          * - Simpan Histori Review
          */
          
          $validator = Validator::make($request->all(), [
            'ticketID' => 'required',
            'hasil_investigasi' => 'required',
            'berkas' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validate();

        // File to JSON
        $berkas = [];
        foreach ($validated['berkas'] as &$item) {
            if (isset($item) && $item instanceof UploadedFile) {
                $uniqueID = uniqid();
                $uniqueFilename = $uniqueID . '_' . $item->getClientOriginalName(); // Generate Unique Name
                $oriFileName = $item->getClientOriginalName(); // Sim
                $item->storeAs('berkas/', $uniqueFilename); // Simpan Gambar ke Storage
                
                // Simpan nama + path
                $berkas[] = [
                    'uniqueId' => $uniqueID,
                    'oriFileName' => $oriFileName,
                    'path' => 'berkas/' . $uniqueFilename,
                ];
            }
        }

        // Update Review on Pengaduan
        pengaduan::where('ticketID', $validated['ticketID'])->update(['review'=> '9']);

        // Save status_histori
        $statusDetail = new status_detail();
        $statusDetail->description = $validated['hasil_investigasi'];
        $statusDetail->file = json_encode($berkas);
        $statusDetail->save();

        $history = new status_history();
        $history->ticketID = $validated['ticketID'];
        $history->review = '9';
        $history->detail_id = $statusDetail->id;
        $history->save();

        // Mail Pelapor
        $tanggal = Date::now()->format('d/m/y');
        $tujuan_pelapor = pengaduan::where('ticketID', $validated['ticketID'])->pluck('email');
        $mail = new EmailController();
        $mail->pelapor_email($validated['ticketID'], 9, $tanggal, $tujuan_pelapor[0]);

        return to_route('dashboard.kurator');
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