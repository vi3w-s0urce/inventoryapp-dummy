<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OrderController;
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
        Route::delete('/product/category/selected:{ids}', 'destroySelected')->name('category.destroySelected');
        Route::resource('/product/category', ProductCategoryController::class);
    });
    Route::controller(ProductController::class)->group(function () {
        Route::delete('/product/selected:{ids}', 'destroySelected')->name('product.destroySelected');
        Route::post('/product/{product}', 'update')->name('product.update');
        Route::resource('/product', ProductController::class);
    });
    Route::controller(SupplierController::class)->group(function () {
        Route::delete('/supplier/selected:{ids}', 'destroySelected')->name('supplier.destroySelected');
        Route::resource('/supplier', SupplierController::class);
    });
    Route::controller(CustomerController::class)->group(function () {
        Route::delete('/customer/selected:{ids}', 'destroySelected')->name('customer.destroySelected');
        Route::resource('/customer', CustomerController::class);
    });
    Route::controller(OrderController::class)->group(function () {
        Route::resource('/order', OrderController::class);
    });
});
