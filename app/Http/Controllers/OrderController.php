<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Order/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::with('supplier', 'product_category')->orderBy('created_at', 'desc')->get();
        $filterSuppliers = Product::pluck('supplier_id')->unique();
        $filterSuppliers = Supplier::findMany($filterSuppliers);
        $filterCategories = Product::pluck('product_category_id')->unique();
        $filterCategories = ProductCategory::findMany($filterCategories);
        $customer = Customer::all();
        return Inertia::render('Order/Create', ['products' => $products, 'filterSuppliers' => $filterSuppliers, 'filterCategories' => $filterCategories, 'customer' => $customer]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
