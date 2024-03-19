<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ProductCategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SupplierController;
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


Route::middleware('auth')->group(function () {
    Route::controller(DashboardController::class)->group(function () {
        Route::get('/', 'dashboard')->middleware('auth')->name('dashboard');
    });
    Route::controller(ProductCategoryController::class)->group(function () {
        Route::delete('/product/category/{ids}', 'destroySelected')->name('category.destroySelected');
        Route::resource('/product/category', ProductCategoryController::class);
    });
    Route::resource('/product', ProductController::class);
    Route::controller(SupplierController::class)->group(function () {
        Route::resource('/supplier', SupplierController::class);
    });
});
