<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\UploadedFile;

use App\Models\pengaduan;

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
                $uniqueFilename = uniqid() . '_' . $item->getClientOriginalName(); // Generate Unique Name
                $oriFileName = $item->getClientOriginalName(); // Sim
                $item->storeAs('public/formUploadFile', $uniqueFilename); // Simpan Gambar ke Storage
                
                // Simpan nama + path
                $lampiran[] = [
                    'oriFileName' => $oriFileName,
                    'path' => 'public/formUploadFile/' . $uniqueFilename,
                ];
            }
        }
        $validated['masalah'] = ($validated['masalah'] === 'Teknis') ? 1 : 0;

        if($validated['masalah'] === 0){
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
                'lampiran_file' => $validated['lampiran'],
                'form_status' => 0, // Status Un-Editable
                'review' => 1       // Status Problem Administratif
            ]);
        } else{
            pengaduan::create([
                'email'=> $validated['email'],
                'nama' => $validated['nama'],
                'no_telp' => $validated['whatsapp'],
                'nama_pelanggar' => $validated['namaPelanggar'],
                'tempat_kejadian' => $validated['tempatKejadian'],
                'tanggal_kejadian' => $validated['tanggalKejadian'],
                'jenis_masalah' => $validated['masalah'],
                'deskripsi_masalah' => $validated['deskripsi'],
                'lampiran_file' => $validated['lampiran'],
                'form_status' => 0, // Status Un-Editable
                'review' => 2       // Status Problem Teknis
            ]);
        }
        // Mail to Tim Validator
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
         * - Validasi Request
         * - Return Data dari Database
         */
        

    }

    function submitRevision(Request $request)
    {
        /**
         * - Validasi Request
         * - Update database
         */

    }
}
