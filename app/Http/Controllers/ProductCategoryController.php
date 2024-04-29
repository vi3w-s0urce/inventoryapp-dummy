<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = ProductCategory::orderBy('created_at', 'desc')->get();
        return Inertia::render('ProductCategory/Index', ['categories' => $categories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $products = Product::with('supplier', 'product_category')->where('product_category_id', null)->orderBy('created_at', 'desc')->get();
        return Inertia::render('ProductCategory/Create', ['products' => $products]);
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
            'selectedProducts' => 'array',
        ]);

        try {
            DB::transaction(function () use ($dataCategory) {
                $selectedProducts = $dataCategory['selectedProducts'];
                unset($dataCategory['selectedProducts']);

                $createdData = ProductCategory::create($dataCategory);

                if (count($selectedProducts) > 0) {
                    foreach ($selectedProducts as $product) {
                        Product::where('id', $product)->update(['product_category_id' => $createdData->id]);
                    }
                }
            });

            return redirect()->route('category.index')->with('success', 'Product Category Added Successfully');
        } catch (QueryException $e) {
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
        $category = ProductCategory::where('id', $id)->first();
        $products = Product::with('supplier', 'product_category')->where('product_category_id', null)->orWhere('product_category_id', $id)->orderByRaw('product_category_id = ' . $id . ' DESC')->orderBy('product_category_id')->get();
        $selectedProducts = Product::with('supplier', 'product_category')->where('product_category_id', $id)->orderBy('created_at', 'desc')->pluck('id');
        return Inertia::render('ProductCategory/Edit', ['category' => $category, 'products' => $products, 'selectedProducts' => $selectedProducts]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $isAdmin = $request->session()->get('isAdmin');

        if (!$isAdmin) {
            return redirect()->back()->with('error', 'Permission Denied❗');
        }

        $dataCategory = $request->validate([
            'name' => 'required|unique:product_categories,name,'.$id,
            'color' => 'required',
            'description' => 'required',
            'selectedProducts' => 'array',
        ]);

        try {
            DB::transaction(function () use ($dataCategory, $id) {
                $selectedProducts = $dataCategory['selectedProducts'];
                unset($dataCategory['selectedProducts']);

                $oldSelectedProducts = Product::with('supplier', 'product_category')->where('product_category_id', $id)->orderBy('created_at', 'desc')->pluck('id');

                $updatedData = ProductCategory::where('id', $id)->update($dataCategory);

                $noneSelected = array_diff($oldSelectedProducts->toArray(), $selectedProducts);

                foreach ($noneSelected as $noneSelectedId) {
                    Product::where('id', $noneSelectedId)->update(['product_category_id' => null]);
                }


                if (count($selectedProducts) > 0) {
                    foreach ($selectedProducts as $product) {
                        Product::where('id', $product)->update(['product_category_id' => $id]);
                    }
                }
            });

            return redirect()->route('category.index')->with('success', 'Product Category Added Successfully');
        } catch (QueryException $e) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }
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

    public function destroySelected(string $ids)
    {
        $ids = explode(',', $ids);

        $checkCategory = ProductCategory::findMany($ids);

        if (!$ids) {
            return redirect()->back()->with('error', 'Invalid Request! ID cant be empty.');
        }

        if (!$checkCategory) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        $deleteCategory = ProductCategory::destroy($ids);

        if (!$deleteCategory) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->back()->with('success', count($ids) . ' Selected category successfully deleted');
    }
}
