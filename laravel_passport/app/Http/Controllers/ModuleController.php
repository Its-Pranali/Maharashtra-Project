<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Module;

class ModuleController extends Controller
{
    public function index()
    {
        $data = Module::where('status', 1)->get();

        if (!empty($data)) {
            return response()->json(['message' => $data, 'code' => 200, 'status' => true]);
        } else {
            return response()->json(['message' => "Data not Found", 'code' => 500, 'status' => false]);
        }
    }

    public function save(Request $request)
    {
        $validator = $request->validate([
            'product' => 'required|string|max:255',
            'module' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);

        $data = Module::create($validator);

        if (!empty($data)) {
            return response()->json(['message' => $data, 'code' => 200, 'status' => true]);
        } else {
            return response()->json(['message' => "Error While saving data", 'code' => 500, 'status' => false]);
        }
    }
}
