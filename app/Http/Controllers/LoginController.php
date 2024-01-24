<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Redirect;
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
            'rememberMe' => ['required'],
        ])->validate();

        $email = $credentials['email'];
        $passw = $credentials['password'];
        $remem = $credentials['rememberMe'];
        
        if(Auth::attempt([
            'email' => $email,
            'password' => $passw
        ], $remem)){
            $request->session()->regenerate();

            return redirect('/dashboard/admin');
        }
        else{
            
            return redirect()->back()->with(['msg' => 'Email atau password salah!'], 401)->withInput();
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
            dd("Logged Out");
        }        
    }
}
