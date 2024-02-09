<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

use App\Models\email;

class EmailController extends Controller
{
    function fetchEmail()
    {
        $emaildata = email::all();

        return response()->json($emaildata);
        
    }

    function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:emails',
            'role' => 'required|in:validator,kurator,dewan',
        ]);

        if ($validator->fails()) {
            return back()->withErrors($validator)->withInput();
        }

        $validated = $validator->validate();

        email::create($validated);
        
        return redirect()->back()->with(['msg' => 'Email Saved!'], 202)->withInput();
    }

    // Archived
    // function edit(Request $request)
    // {
    //     try {
    //         $validated = Validator::make($request->all(), [
    //             'oldEmail' => ['required', 'email'],
    //             'oldRole' => ['required', 'in:1,2,3'],
    //             'newEmail' => ['required', 'email'],
    //             'newRole' => ['required', 'in:1,2,3']
    //         ])->validate();

    //     } catch (ValidationException $e) {
    //         return redirect()->back()->with(['msg' => 'Email sudah ada!'], 402)->withInput();
    //     }

    //     $foundEmail = Email::where('email', $validated['oldEmail'])
    //                        ->where('role', $validated['oldRole'])
    //                        ->first();

    //     if ($foundEmail) {
    //         // Update data dengan nilai baru
    //         $foundEmail->update([
    //             'email' => $validated['newEmail'],
    //             'role' => $validated['newRole']
    //         ]);

    //         // Redirect atau response sukses jika diperlukan
    //         return redirect()->back()->with(['msg' => 'Email Updated!'], 200)->withInput();

    //     } else {
    //         // Data tidak ditemukan
    //         return redirect()->back()->with(['msg' => 'Data Tidak Ditemukan!'], 404)->withInput();
    //     }
    // }

    function destroy(String $id)
    {
        // Delete the user
        $res=email::where('id', $id)->delete();
        
        if($res){
            return redirect()->back()->with(['msg' => 'Success'], 204)->withInput();
        }else{
            return redirect()->back()->with(['msg' => 'Failed'], 404)->withInput();   
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
