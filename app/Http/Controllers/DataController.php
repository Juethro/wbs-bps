<?php

namespace App\Http\Controllers;

use App\Models\pengaduan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DataController extends Controller
{
    function fetchData()
    {
        $pengaduandata = pengaduan::all();

        return response()->json($pengaduandata);
    }

    public function updateReview(Request $request)
    {
        // Validasi data yang diterima dari permintaan
        $request->validate([
            'ticketID' => 'required|exists:pengaduan,ticketID', // Pastikan ticketID ada di tabel pengaduan
            'review' => 'required|in:0,1,2,3,4', // Pastikan review memiliki nilai yang valid
        ]);

        // Temukan pengaduan berdasarkan ticketID
        $pengaduan = Pengaduan::where('ticketID', $request->ticketID)->first();

        // Perbarui nilai review pengaduan
        $pengaduan->review = $request->review;
        $pengaduan->save();

        // Berikan respons sukses
        return response()->json(['message' => 'Review berhasil diperbarui'], 200);
    }
}