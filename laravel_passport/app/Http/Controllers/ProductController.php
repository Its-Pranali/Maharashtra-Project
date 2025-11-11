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

    public function update(Request $request, $id)
    {
        $data = Products::find($id);

        if (!$data) {
            return response()->json(['status' => false, 'message' => "data not found", 'code' => 500]);
        }

        $validator = $request->validate([
            'product' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
            'priority' => 'required|string|max:255',
        ]);

        $data->product = $validator['product'];
        $data->regional_name = $validator['regional_name'];
        $data->priority = $validator['priority'];

        $result = $data->save();
        if ($result) {
            return response()->json(['status' => true, 'message' => "product updated successfully", 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "error while updating product", 'code' => 500]);
        }
    }

    public function delete($id)
    {
        $data = Products::findOrFail($id);
        $data->status = 0;
        $result = $data->save();
        if ($result) {
            return response()->json(['status' => true, 'message' => "Product deleted successfully", 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "Error while delete the product", 'code' => 500]);
        }
    }
}
