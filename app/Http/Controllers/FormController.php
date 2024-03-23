<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Date;

use App\Models\pengaduan;
use App\Models\email;
use App\Models\status_detail;
use App\Models\status_history;
use App\Http\Controllers\EmailController;

class FormController extends Controller
{
    function home()
    {
        return Inertia::render('HomePage');
    }

    function pengaduan()
    {
        return Inertia::render('FormPengaduan');
    }

    function status()
    {
        return Inertia::render('FormStatus');
    }

    // Fungsi untuk mendapatkan nama bulan
    private function getMonthName($monthNumber) {
        $months = [
        '01' => 'Januari',
        '02' => 'Februari',
        '03' => 'Maret',
        '04' => 'April',
        '05' => 'Mei',
        '06' => 'Juni',
        '07' => 'Juli',
        '08' => 'Agustus',
        '09' => 'September',
        '10' => 'Oktober',
        '11' => 'November',
        '12' => 'Desember',
        ];
    
        return $months[$monthNumber];
    }

    function submitStore(Request $request)
    {
        /**
         * - Validasi Request
         * - Simpan file dan path file tersebut 
         */
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'whatsapp' => 'required|digits_between:10,13',
            'email' => 'required|email',
            'masalah' => 'required|in:Administratif,Teknis',
            'namaPelanggar' => 'required',
            'tempatKejadian' => 'required',
            'tanggalKejadian' => 'required',
            'deskripsi' => 'required',
            'lampiran' => 'required',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validate();
        $ticket = $this->generateTicketID();

        $lampiran = [];
        foreach ($validated['lampiran'] as &$item) {
            if (isset($item) && $item instanceof UploadedFile) {
                $uniqueID = uniqid();
                $uniqueFilename = $uniqueID . '_' . $item->getClientOriginalName(); // Generate Unique Name
                $oriFileName = $item->getClientOriginalName(); // Sim
                $item->storeAs('public/formUploadFile', $uniqueFilename); // Simpan Gambar ke Storage
                
                // Simpan nama + path
                $lampiran[] = [
                    'uniqueId' => $uniqueID,
                    'oriFileName' => $oriFileName,
                    'path' => 'public/formUploadFile/' . $uniqueFilename,
                ];
            }
        }
        $validated['masalah'] = ($validated['masalah'] === 'Teknis') ? '1' : '0';

        if($validated['masalah'] === '0'){
            pengaduan::create([
                'ticketID' => $ticket,
                'email'=> $validated['email'],
                'nama' => $validated['nama'],
                'no_telp' => $validated['whatsapp'],
                'nama_pelanggar' => $validated['namaPelanggar'],
                'tempat_kejadian' => $validated['tempatKejadian'],
                'tanggal_kejadian' => $validated['tanggalKejadian'],
                'jenis_masalah' => $validated['masalah'],
                'deskripsi_masalah' => $validated['deskripsi'],
                'lampiran_file' => json_encode($lampiran),
                'form_status' => '0', // Status Un-Editable
                'review' => 1       // Status Problem Administratif
            ]);
        } else{
            pengaduan::create([
                'ticketID' => $ticket,
                'email'=> $validated['email'],
                'nama' => $validated['nama'],
                'no_telp' => $validated['whatsapp'],
                'nama_pelanggar' => $validated['namaPelanggar'],
                'tempat_kejadian' => $validated['tempatKejadian'],
                'tanggal_kejadian' => $validated['tanggalKejadian'],
                'jenis_masalah' => $validated['masalah'],
                'deskripsi_masalah' => $validated['deskripsi'],
                'lampiran_file' => json_encode($lampiran),
                'form_status' => '0', // Status Un-Editable
                'review' => '2'       // Status Problem Teknis
            ]);
        }
        
        // Mail to Pelapor & Tim Validator
        $tanggal = Date::now()->format('d/m/y');
        $tujuan_pelapor = $validated['email'];
        $tujuan_reviewer = email::where('role', 'validator')->pluck('email');

        if($validated['masalah'] === '0'){
            // Administratif
            $mail = new EmailController();
            $mail->pelapor_email($ticket, 1, $tanggal, $tujuan_pelapor);
            
            foreach ($tujuan_reviewer as $email) {
                $mail->reviewer_email($ticket, 1, $email);
            }

        } else{
            // Teknis
            $mail = new EmailController();
            $mail->pelapor_email($ticket, 2, $tanggal, $tujuan_pelapor);
            
            foreach ($tujuan_reviewer as $email) {
                $mail->reviewer_email($ticket, 2, $email);
            }
        }

        // Simpan di Status_history
        $statusDetail = new status_detail();
        $statusDetail->description = 'Laporan Diterima';
        $statusDetail->save();

        $statusHistory = new status_history();
        $statusHistory->ticketID = $ticket;
        if($validated['masalah'] === '0' ){
            // Administratif
            $statusHistory->review = '1';
        } else{
            // Teknis
            $statusHistory->review = '2';
        }
        $statusHistory->detail_id = $statusDetail->id; // Menggunakan ID dari status_details yang baru saja dimasukkan
        $statusHistory->save();

        
        return redirect()->route('home');
    }

    function generateTicketID() {
        $prefix = 'TD';
        $randomPart = Str::random(8);
        $ticketID = $prefix . $randomPart;
    
        // Cek apakah ticketID sudah ada di dalam tabel Pengaduan
        while (pengaduan::where('ticketID', $ticketID)->exists()) {
            // Jika sudah ada, buat ticketID baru
            $randomPart = Str::random(8);
            $ticketID = $prefix . $randomPart;
        }
    
        return $ticketID;
    }

    function descStatus(String $status){
        $description = [
            '1' => 'Laporan Diterima',
            '2' => 'Laporan Diterima',
            '3' => 'Laporan Perlu Direvisi',
            '4' => 'Laporan Sedang Direview',
            '5' => 'Laporan Sedang Direview',
            '6' => 'Laporan sedang dilakukan investigasi',
            '7' => 'Laporan Dikirim Ke Pusat',
            '8' => 'Laporan Terbukti,',
            '9' => 'Ticket Telah Ditutup, Terimakasih Atas Pastisipasinya',
        ];
        
        return $description[$status];
    }

    function track(Request $request)
    {
        /**
         * - Return Data dari Database
         */
        $ticket = $request->ticket;
        $history = status_history::select('id','review', 'detail_id','created_at')->where('ticketID', $ticket)->orderBy('created_at', 'desc')->get();
        $form_status = pengaduan::select('form_status')->where('ticketID', $ticket)->get();

        // Check if any data is found
        if ($history->isEmpty()) {
            // Ticket not found, return appropriate message
            return response()->json([
                'message' => 'Ticket not found.',
                'status' => 'error',
            ], 404);
        }

        $i = 0;

        foreach ($history as $item) {
            $datesPart = explode(' ', $item->created_at)[0];
            $date = explode('-', $datesPart);
            $newDate = $date[2] . ' ' . $this->getMonthName($date[1]) . ' ' . $date[0];

            $jam = explode(' ', $item->created_at)[1];
            $jamSplit = explode(':', $jam);
            $jamHanya = $jamSplit[0]; // Ambil jam
            $menit = $jamSplit[1]; // Ambil menit

            $data[] = [
                'id' => $i,
                'ticket' => $ticket,
                'form_status' => $form_status->first()->form_status,
                'description' => $this->descStatus($item->review) ,
                'jam' => $jamHanya . ':' . $menit . ' WIB',
                'tanggal' => $newDate,
              ];
              
            $i++;
        }

        return json_encode($data);
    }

    function revision(Request $request)
    {
        $ticket = $request->ticket;
        $data = pengaduan::where('ticketID', $ticket)->get();

        return inertia::render('FormRevisi', ['data'=> json_encode($data[0])]);
    }

    function submitRevision(Request $request)
    {
        /**
         * - Validasi Request
         * - Update database
         */

        $validator = Validator::make($request->all(), [
            'ticketID' => 'required',
            'nama' => 'required',
            'no_telp' => 'required',
            'email' => 'required|email',
            'jenis_masalah' => 'required',
            'namaPelanggar' => 'required',
            'tempatKejadian' => 'required',
            'tanggalKejadian' => 'required',
            'deskripsi' => 'required',
            'lampiran_lama' => 'nullable',
            'lampiran_baru' => 'nullable'
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validate();

        $ticket = $validated['ticketID'];

        // Mencocokan lampiran_lama
        $lampiran_ori = pengaduan::where('ticketID', $ticket)->pluck('lampiran_file');
        $lampiran_ori = json_decode($lampiran_ori[0]);

        $uniqueIds_ori = array_column($lampiran_ori, 'uniqueId');
        $uniqueIds_lama = array_column($validated['lampiran_lama'][0], 'uniqueId');

        $uniqueIds_diff = array_diff($uniqueIds_ori, $uniqueIds_lama);  //yang ada di ori tetapi tidak ada di lama

        // Hapus File yang hilang
        $files_to_delete = [];
        foreach ($lampiran_ori as $file) {
            if (in_array($file->uniqueId, $uniqueIds_diff)) {
                $files_to_delete[] = $file->path;
            }
        }

        // Menyimpan lampiran_file baru dan merge
        $lampiran_file_baru = [];
        foreach ($validated['lampiran_baru'] as &$item) {
            if (isset($item) && $item instanceof UploadedFile) {
                $uniqueID = uniqid();
                $uniqueFilename = $uniqueID . '_' . $item->getClientOriginalName(); // Generate Unique Name
                $oriFileName = $item->getClientOriginalName(); // Sim
                $item->storeAs('public/formUploadFile', $uniqueFilename); // Simpan Gambar ke Storage
                
                // Simpan nama + path
                $lampiran_file_baru[] = [
                    'uniqueId' => $uniqueID,
                    'oriFileName' => $oriFileName,
                    'path' => 'public/formUploadFile/' . $uniqueFilename,
                ];
            }
        }

        $lampiran_file_updated = array_merge($lampiran_file_baru, $validated['lampiran_lama'][0]);

        // Menyimpan data baru
        pengaduan::where('ticketId', $ticket)->update([
            'nama_pelanggar' => $validated['namaPelanggar'],
            'tempat_kejadian' => $validated['tempatKejadian'],
            'tanggal_kejadian' => $validated['tanggalKejadian'],
            'deskripsi_masalah' => $validated['deskripsi'],
            'lampiran_file' => $lampiran_file_updated,
            'form_status' => '0',                         // Update form status editable to un-editable
        ]);

        // Update status_review
        if($validated['jenis_masalah'] == '0'){
            // Administratif
            pengaduan::where('ticketID', $validated['ticketID'])->update(['review'=> '1']);

        } else if($validated['jenis_masalah'] == '1'){
            // Teknis
            pengaduan::where('ticketID', $validated['ticketID'])->update(['review'=> '2']);
        }
        

        // Save to status_histori
        $statusDetail = new status_detail();
        $statusDetail->description = "Laporan Telah Direvisi";
        $statusDetail->save();

        $history = new status_history();
        $history->ticketID = $ticket;
        if($validated['jenis_masalah'] == '0'){
            // Administratif
            $history->review = '2';

        } else if($validated['jenis_masalah'] == '1'){
            // Teknis
            $history->review = '1';
        }
        $history->detail_id = $statusDetail->id;
        $history->save();

        // Mail to Pelapor & Tim Validator
        $tanggal = Date::now()->format('d/m/y');
        $tujuan_pelapor = $validated['email'];
        $tujuan_reviewer = email::where('role', 'validator')->pluck('email');

        if($validated['jenis_masalah'] === '0'){
            // Administratif
            $mail = new EmailController();
            $mail->pelapor_email($ticket, 1, $tanggal, $tujuan_pelapor);
            
            foreach ($tujuan_reviewer as $email) {
                $mail->reviewer_email($ticket, 1, $email);
            }

        } else{
            // Teknis
            $mail = new EmailController();
            $mail->pelapor_email($ticket, 2, $tanggal, $tujuan_pelapor);
            
            foreach ($tujuan_reviewer as $email) {
                $mail->reviewer_email($ticket, 2, $email);
            }
        }


    }
}
