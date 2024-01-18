<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AuthController extends Controller
{
    public function loginView () {
        return Inertia::render('Login');
    }

    public function login (Request $request) {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $user = User::where('email', $credentials['email'])->first();

        if (!$user) return redirect()->back()->withErrors(['email' => 'Email not found!'])->with('error', 'Login failed!');

        if (!Auth::attempt($credentials)) {
            return redirect()->back()->withErrors(['password' => 'Incorrect password!'])->with('error', 'Login failed!');
        }

        $request->session()->put('user', auth()->user());
        $request->session()->put('isAdmin', (auth()->user()->roles == 'admin') ? true : false );

        return redirect()->route('dashboard')->with('success', 'Welcome '.auth()->user()->name.'👋');
    }

    public function logout(Request $request) {
        $request->session()->forget('user');
        $request->session()->forget('isAdmin');
        auth()->logout();
        return redirect()->route('login')->with('success', 'Your account has been logged out');
    }
}
