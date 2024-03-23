<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('LoginAdmin');
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
            'rememberMe' => ['nullable'], // Optional, adjust based on your logic
        ]);
        
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()->messages(),
            ], 422);
        }

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->has('rememberMe'))) {
            
            return response()->json([
                'success' => true,
                'message' => 'Login Berhasil!',
                'user' => Auth::user(), // Optionally return user data
            ], 200);
        }

        return response()->json([
            'success' => false,
            'message' => 'Email atau Password salah!',
        ], 401);

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
