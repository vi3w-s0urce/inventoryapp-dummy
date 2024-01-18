<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function dashboard(Request $request) {
        $user = $request->session()->get('user');
        $isAdmin = $request->session()->get('isAdmin');
        return Inertia::render('Dashboard', ['user' => $user, 'isAdmin' => $isAdmin]);
    }
}
