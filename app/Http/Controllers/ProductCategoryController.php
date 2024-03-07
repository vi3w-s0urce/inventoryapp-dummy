<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoriesData = ProductCategory::orderBy('created_at', 'desc')->get();
        return Inertia::render('ProductCategory/Index', ['categoriesData' => $categoriesData]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('ProductCategory/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $isAdmin = $request->session()->get('isAdmin');

        if (!$isAdmin) {
            return redirect()->back()->with('error', 'Permission Denied❗');
        }

        $dataCategory = $request->validate([
            'name' => 'required|unique:product_categories,name',
            'color' => 'required',
            'description' => 'required',
        ]);

        $createdData = ProductCategory::create($dataCategory);

        if ($createdData) {
            return redirect()->route('category.index')->with('success', 'Product Category Added Successfully');
        } else {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }
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
        $checkCategory = ProductCategory::find($id);

        if (!$id) {
            return redirect()->back()->with('error', 'Invalid Request! ID cant be empty.');
        }

        if (!$checkCategory) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        $deleteCategory = ProductCategory::destroy($id);

        if (!$deleteCategory) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->back()->with('success', 'Category successfully deleted');
    }
}
