<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        $data = [
            'users' => $users,
        ];

        return Inertia::render('UserIndex', $data);
    }

    public function create()
    {
        return Inertia::render('UserCreate');
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required|min:6',
            'role' => 'required|in:admin,direksi,humas,dewan',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
        ]);
        return redirect()->route('user.index')->with('success', 'User berhasil dibuat');
    }

    public function edit(User $user)
    {
        return Inertia::render('UserEdit', ['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email,' . $user->id,
            'role' => 'required|in:admin,direksi,humas,dewan',
        ]);

        // Update the user
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
        ]);

        return redirect()->route('user.index')->with('success', 'User berhasil diperbaharui');
    }

    public function destroy(User $user)
    {
        // Delete the user
        $user->delete();
        
        return redirect()->route('user.index')->with('success', 'User berhasil dihapus');
    }
}

