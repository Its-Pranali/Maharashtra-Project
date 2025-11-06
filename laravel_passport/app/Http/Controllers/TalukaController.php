<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\CommonActionController;
use App\Models\Taluka;

class TalukaController extends Controller
{

    public function index()
    {
        $taluka = Taluka::where('status', 1)->get();
        if (!empty($taluka)) {
            return response()->json(['message' => $taluka, 'code' => 200, 'status' => true]);
        } else {
            return response()->json(['message' => "Data not found", 'code' => 200, 'status' => false]);
        }
    }

    public function save(Request $request)
    {
        $validator = $request->validate([
            'district' => 'required|string|max:255',
            'taluka_name' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);

        $data = Taluka::create($validator);
        return sendReposne($data);
    }
}
