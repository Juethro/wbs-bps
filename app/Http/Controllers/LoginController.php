<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('LoginAdmin');
    }

    public function login(Request $request)
    {
        $credentials = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ])->validate();

        $email = $credentials['email'];
        $passw = $credentials['password'];
        
        if(Auth::attempt([
            'email' => $email,
            'password' => $passw
        ])){
            $request->session()->regenerate();

            return response()->json(['msg' => 'Berhasil Login!'],200);
        }
        else{
            
            return response()->json(['msg' => 'Email atau Password Salah!'], 401);
        }

    }

    public function logout(Request $request)
    {
        $request->session()->flush();

        return redirect('/login');
    }

    public function check()
    {
        if (Auth::check()) {
            dd("Logged In");
        } else {
            // Pengguna sudah logout
        }        
    }
}
