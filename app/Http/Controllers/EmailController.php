<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use app\Models\email;
use Illuminate\Support\Facades\Validator;

class EmailController extends Controller
{
    function create(Request $request)
    {
        try {
            $validated = Validator::make($request->all(), [
                'email' => ['required', 'email', 'unique:emails,email'],
                'role' => ['required', 'in:1,2,3']
            ])->validate();
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with(['msg' => 'Email sudah ada!'], 402)->withInput();
        }

        email::create($validated);
        
        return redirect()->back()->with(['msg' => 'Email Saved!'], 200)->withInput();
    }

    function edit(Request $request)
    {
        try {
            $validated = Validator::make($request->all(), [
                'oldEmail' => ['required', 'email'],
                'oldRole' => ['required', 'in:1,2,3'],
                'newEmail' => ['required', 'email'],
                'newRole' => ['required', 'in:1,2,3']
            ])->validate();

        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with(['msg' => 'Email sudah ada!'], 402)->withInput();
        }

        $foundEmail = Email::where('email', $validated['oldEmail'])
                           ->where('role', $validated['oldRole'])
                           ->first();

        if ($foundEmail) {
            // Update data dengan nilai baru
            $foundEmail->update([
                'email' => $validated['newEmail'],
                'role' => $validated['newRole']
            ]);

            // Redirect atau response sukses jika diperlukan
            return redirect()->back()->with(['msg' => 'Email Updated!'], 200)->withInput();

        } else {
            // Data tidak ditemukan
            return redirect()->back()->with(['msg' => 'Data Tidak Ditemukan!'], 404)->withInput();
        }
    }

    function delete(Request $request)
    {
        try {
            $validated = Validator::make($request->all(), [
                'email' => ['required', 'email', 'unique:emails,email'],
                'role' => ['required', 'in:1,2,3']
            ])->validate();
        } catch (\Illuminate\Validation\ValidationException $e) {
            return redirect()->back()->with(['msg' => 'Error!'], 401)->withInput();
        }

        $foundEmail = Email::where('email', $validated['email'])
                           ->where('role', $validated['role'])
                           ->first();
        
        if ($foundEmail) {

            $foundEmail->delete();

            return redirect()->back()->with(['msg' => 'Email Deleted!'],200)->withInput();
        } else {

            return redirect()->back()->with(['msg' => 'Email not found.'], 404)->withInput();

        }
    }

    function pelapor_email($ticket, $status, $email)
    {
        switch ($status)
        {
            case 1:
                dd($ticket);
                break;
            case 2:
                dd($ticket);
                break;
            case 3:
                dd($ticket);
                break;
            case 4:
                dd($ticket);
                break;
            case 5:
                dd($ticket);
                break;
            case 6:
                dd($ticket);
                break;
            case 7:
                dd($ticket);
                break;
            case 8:
                dd($ticket);
                break;
            case 9:
                dd($ticket);
                break;
        }
    }

    function reviewer_email($ticket, $status)
    {
        switch ($status)
        {
            case 1:
                dd($ticket);
                break;
            case 2:
                dd($ticket);
                break;
            case 3:
                dd($ticket);
                break;
            case 4:
                dd($ticket);
                break;
            case 5:
                dd($ticket);
                break;
            case 6:
                dd($ticket);
                break;
            case 7:
                dd($ticket);
                break;
            case 8:
                dd($ticket);
                break;
            case 9:
                dd($ticket);
                break;
        }
    }

}
