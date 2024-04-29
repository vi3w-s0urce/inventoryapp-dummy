<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customers = Customer::orderBy('created_at', 'desc')->get();
        return Inertia::render('Customer/Index', ['customers' => $customers]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Customer/Create');
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

        $dataCustomer = $request->validate([
            'name' => 'required',
            'number_phone' => 'required',
            'email' => 'required',
            'address' => 'required',
        ]);

        $createdData = Customer::create($dataCustomer);

        if ($createdData) {
            return redirect()->route('customer.index')->with('success', 'Customer Added Successfully');
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
        $customer = Customer::find($id);

        if (!$customer) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found');
        }

        return Inertia::render('Customer/Edit', ['customer' => $customer]);
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

        $customer = Customer::find($id);

        if (!$customer) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        $dataCustomer = $request->validate([
            'name' => 'required',
            'number_phone' => 'required',
            'email' => 'required',
            'address' => 'required',
        ]);

        $updatedData = Customer::where('id', $id)->update($dataCustomer);

        if (!$updatedData) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->route('customer.index')->with('success', 'Customer successfully edited');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $checkCustomer = Customer::find($id);

        if (!$id) {
            return redirect()->back()->with('error', 'Invalid Request! ID cant be empty.');
        }

        if (!$checkCustomer) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        $deleteCustomer = Customer::destroy($id);

        if (!$deleteCustomer) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->back()->with('success', 'Customer successfully deleted');
    }

    public function destroySelected(string $ids)
    {
        $ids = explode(',', $ids);

        $checkCustomer = Customer::findMany($ids);

        if (!$ids) {
            return redirect()->back()->with('error', 'Invalid Request! ID cant be empty.');
        }

        if (!$checkCustomer) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        $deleteCustomer = Customer::destroy($ids);

        if (!$deleteCustomer) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->back()->with('success', count($ids) . ' Selected customer successfully deleted');
    }
}
