<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Supplier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::with('supplier', 'product_category')->orderBy('created_at', 'desc')->get();
        $filterSuppliers = Product::pluck('supplier_id')->unique();
        $filterSuppliers = Supplier::findMany($filterSuppliers);
        $filterCategories = Product::pluck('product_category_id')->unique();
        $filterCategories = ProductCategory::findMany($filterCategories);
        return Inertia::render('Product/Index', ['products' => $products, 'filterSuppliers' => $filterSuppliers, 'filterCategories' => $filterCategories]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $suppliers = Supplier::all();
        $categories = ProductCategory::all();
        return Inertia::render('Product/Create', ['suppliers' => $suppliers, 'categories' => $categories]);
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

        $dataProduct = $request->validate([
            'name' => 'required',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'supplier_id' => 'required|integer',
            'product_category_id' => '',
            'description' => 'required',
            'image' => 'required|image|mimes:jpeg,jpg,png,webp|max:10000'
        ]);

        $imageName = md5($request->image . microtime()) . '.' . $request->image->extension();

        $moveFile = $request->file('image')->storeAs('public/productImages', $imageName);

        if ($moveFile) {
            $dataProduct["image"] = $imageName;
        } else {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        $createdData = Product::create($dataProduct);

        if ($createdData) {
            return redirect()->route('product.index')->with('success', 'Product Added Successfully');
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
        $product = Product::where('id', $id)->with('supplier', 'product_category')->orderBy('created_at', 'desc')->first();
        $suppliers = Supplier::all();
        $categories = ProductCategory::all();

        if (!$product) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found');
        }

        return Inertia::render('Product/Edit', ['product' => $product, 'suppliers' => $suppliers, 'categories' => $categories]);
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

        $product = Product::find($id);

        if (!$product) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        $dataProduct = $request->validate([
            'name' => 'required',
            'price' => 'required|integer',
            'stock' => 'required|integer',
            'supplier_id' => 'required|integer',
            'product_category_id' => '',
            'description' => 'required',
            'image' => $request->image == "old" ? '' : 'required|image|mimes:jpeg,jpg,png,webp|max:10000',
        ]);

        if ($request->image == "old") {
            unset($dataProduct['image']);
        } else {

            $oldImageFilePath = 'public/productImages/' . $product->image;

            if (Storage::exists($oldImageFilePath)) {
                Storage::delete($oldImageFilePath);
            }

            $imageName = md5($request->image . microtime()) . '.' . $request->image->extension();

            $moveFile = $request->file('image')->storeAs('public/productImages', $imageName);

            if ($moveFile) {
                $dataProduct["image"] = $imageName;
            } else {
                return redirect()->back()->with('error', 'Something Went Wrong☹️');
            }
        }

        $updatedData = Product::where('id', $id)->update($dataProduct);

        if (!$updatedData) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->route('product.index')->with('success', 'Product successfully edited');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $checkProduct = Product::find($id);

        if (!$id) {
            return redirect()->back()->with('error', 'Invalid Request! ID cant be empty.');
        }

        if (!$checkProduct) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        $imageFilePath = 'public/productImages/' . $checkProduct->image;

        if (Storage::exists($imageFilePath)) {
            Storage::delete($imageFilePath);
        }

        $deleteProduct = Product::destroy($id);

        if (!$deleteProduct) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->back()->with('success', 'Product successfully deleted');
    }

    public function destroySelected(string $ids)
    {
        $ids = explode(',', $ids);

        $checkProduct = Product::findMany($ids);

        if (!$ids) {
            return redirect()->back()->with('error', 'Invalid Request! ID cant be empty.');
        }

        if (!$checkProduct) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        foreach ($checkProduct as $product) {
            $imageFilePath = 'public/productImages/' . $product->image;

            if (Storage::exists($imageFilePath)) {
                Storage::delete($imageFilePath);
            }
        }

        $deleteProduct = Product::destroy($ids);

        if (!$deleteProduct) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->back()->with('success', count($ids) . ' Selected product successfully deleted');
    }
}
