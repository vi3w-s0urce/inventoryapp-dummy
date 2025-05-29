<?php

namespace App\Http\Controllers;

use App\Models\Supplier;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $suppliers = Supplier::withCount('products')->orderBy('created_at', 'desc')->get();
        return Inertia::render('Supplier/Index', ['suppliers' => $suppliers]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Supplier/Create');
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

        $dataSupplier = $request->validate([
            'name' => 'required',
            'number_phone' => 'required',
            'email' => 'required',
            'address' => 'required',
        ]);

        $createdData = Supplier::create($dataSupplier);

        if ($createdData) {
            return redirect()->route('supplier.index')->with('success', 'Supplier Added Successfully');
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
        $supplier = Supplier::find($id);

        if (!$supplier) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found');
        }

        return Inertia::render('Supplier/Edit', ['supplier' => $supplier]);
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

        $supplier = Supplier::find($id);

        if (!$supplier) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        $dataSupplier = $request->validate([
            'name' => 'required',
            'number_phone' => 'required',
            'email' => 'required',
            'address' => 'required',
        ]);

        $updatedData = Supplier::where('id', $id)->update($dataSupplier);

        if (!$updatedData) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->route('supplier.index')->with('success', 'Supplier successfully edited');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $checkSupplier = Supplier::find($id);

        if (!$id) {
            return redirect()->back()->with('error', 'Invalid Request! ID cant be empty.');
        }

        if (!$checkSupplier) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        $deleteSupplier = Supplier::destroy($id);

        if (!$deleteSupplier) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->route('supplier.index')->with('success', 'Supplier successfully edited');
    }

    public function destroySelected(string $ids)
    {
        $ids = explode(',', $ids);

        $checkSupplier = Supplier::findMany($ids);

        if (!$ids) {
            return redirect()->back()->with('error', 'Invalid Request! ID cant be empty.');
        }

        if (!$checkSupplier) {
            return redirect()->back()->with('error', 'Invalid Request! Item not found.');
        }

        $deleteSupplier = Supplier::destroy($ids);

        if (!$deleteSupplier) {
            return redirect()->back()->with('error', 'Something Went Wrong☹️');
        }

        return redirect()->back()->with('success', count($ids) . ' Selected supplier successfully deleted');
    }
}
