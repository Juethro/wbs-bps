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

    function track(Request $request)
    {
        /**
         * - Return Data dari Database
         */
        $ticket = $request->ticket;
        // $ticket = 'TD6ZgyVW54';
        $history = status_history::select('id','review', 'detail_id','created_at')->where('ticketID', $ticket)->orderBy('created_at', 'desc')->get();

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
                'description' => $item->statusDetail->description,
                'jam' => $jamHanya . ':' . $menit . ' WIB',
                'tanggal' => $newDate,
              ];
              
            $i++;
        }
        // dd(json_encode($data));

        return json_encode($data);
    }

    function submitRevision(Request $request)
    {
        /**
         * - Validasi Request
         * - Update database
         */

    }
}
