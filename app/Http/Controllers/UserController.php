<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\EmailController;

class UserController extends Controller
{
    public function fetchUser()
    {
        $users = User::all();
        
        return response()->json($users);
    }

    public function store(Request $request)
    {
        // Validate the incoming request
        $validator = Validator::make($request->all(), [
            'nama' => 'required',
            'email' => 'required|email|unique:users',
            'passw' => 'required|min:6',
            'role' => 'required|in:admin,validator,kurator,dewan',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()->messages(),
            ], 422);
        }

        $validated = $validator->validate();

        User::create([
            'name' => $validated["nama"],
            'email' => $validated["email"],
            'password' => Hash::make($validated["passw"]),
            'role' => $validated["role"],
        ]);

        $mail = new EmailController();
        $mail->added_user($validated["role"], $validated["email"]);

        return response()->json([
            'success' => true,
            'message' => 'User saved!',
        ], 202);
    }

    // Archived
    // public function update(Request $request, User $user)
    // {
    //     $request->validate([
    //         'name' => 'required',
    //         'email' => 'required|unique:users,email,' . $user->id,
    //         'role' => 'required|in:admin,direksi,humas,dewan',
    //     ]);

    //     // Update the user
    //     $user->update([
    //         'name' => $request->name,
    //         'email' => $request->email,
    //         'role' => $request->role,
    //     ]);

    //     return redirect()->route('user.index')->with('success', 'User berhasil diperbaharui');
    // }

    public function destroy(String $id)
    {
        // User Role + Email
        $role = User::find($id)->role;
        $email = User::find($id)->email;

        // Delete the user
        $res = User::where('id', $id)->delete();
        
        if($res){
            $mail = new EmailController();
            $mail->removed_user($role, $email);

            return redirect()->back()->with(['msg' => 'Success'], 204)->withInput();
        }else{
            return redirect()->back()->with(['msg' => 'Failed'], 404)->withInput();   
        }
    }
}

