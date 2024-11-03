<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Order;
use App\Models\Order_Detail;
use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\Supplier;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::orderBy('created_at', 'desc')->get();
        return Inertia::render('Order/Index', ['orders' => $orders]);
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
        $dataOrder = $request->validate([
            'order_name' => 'required|string',
            'customer_id' => 'required|integer',
            'total_product' => 'required|integer',
            'total_stock' => 'required|integer',
            'total_price' => 'required|integer',
            'cartData' => 'required|array',
        ]);

        $dataCartOrder = $dataOrder['cartData'];

        unset($dataOrder['cartData']);
        $dataOrder['status'] = 'waiting';

        try {
            DB::transaction(function () use ($dataOrder, $dataCartOrder) {
                $createOrder = Order::create($dataOrder);

                foreach ($dataCartOrder as $cartOrder) {
                    $cartOrder['order_id'] = $createOrder->id;
                    $createOrderDetail = Order_Detail::create($cartOrder);
                    $decrementProductQty = Product::where('id', $cartOrder['product_id'])->decrement('stock', $cartOrder['qty']);
                }
            });

            return redirect()->route('order.index')->with('success', 'Order Added Successfully');
        } catch (QueryException $e) {
            dd($e->getMessage());
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
        //
    }
}
