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

    public function update(Request $request, $id)
    {
        $data = Taluka::find($id);
        if (!$data) {
            return response()->json(['status' => false, 'message' => "data not found", 'code' => 500]);
        }

        $validator = $request->validate([
            'district' => 'required|string|max:255',
            'taluka_name' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);

        $data->district = $validator['district'];
        $data->taluka_name = $validator['taluka_name'];
        $data->regional_name = $validator['regional_name'];

        $result = $data->save();

        if ($result) {
            return response()->json(['status' => true, 'message' => "Taluka updated successfully", 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "error while updating taluka", 'code' => 500]);
        }
    }
}
