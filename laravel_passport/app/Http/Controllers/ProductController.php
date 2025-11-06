<?php

namespace App\Http\Controllers;

use App\Models\Products;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index()
    {
        $products = Products::where('status', 1)->get();
        return response()->json($products, 200);
    }


    public function save(Request $request)
    {
        $validatedData = $request->validate([
            'product' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
            'priority' => 'required|string|max:255',
        ]);

        $data = Products::create($validatedData);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $data,
        ], 201);
    }
}
