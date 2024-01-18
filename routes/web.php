<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::controller(AuthController::class)->group(function () {
    Route::get('/login', 'loginView')->middleware('guest')->name('login');
    Route::post('/login', 'login')->middleware('guest')->name('login');
    Route::get('/logout', 'logout')->middleware('auth')->name('logout');
});

Route::controller(DashboardController::class)->group(function () {
    Route::get('/', 'dashboard')->middleware('auth')->name('dashboard');
});