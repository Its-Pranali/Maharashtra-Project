<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Village;

class VillageController extends Controller
{
    public function index()
    {
        $data = Village::where('status', 1)->get();

        if (!empty($data)) {
            return response()->json(['status' => true, 'message' => $data, 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "Error while fetching data", 'code' => 500]);
        }
    }

    public function save(Request $request)
    {
        $validator = $request->validate([
            'district' => 'required|string|max:255',
            'taluka' => 'required|string|max:255',
            'village' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);
        $data = Village::create($validator);
        if (!empty($data)) {
            return response()->json(['status' => true, 'message' => "village saved successfully", 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "Error while saving village", 'code' => 500]);
        }
    }

    public function update(Request $request, $id)
    {
        $data = Village::find($id);

        $validator = $request->validate([
            'district' => 'required|string|max:255',
            'taluka' => 'required|string|max:255',
            'village' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);

        $data->district = $validator['district'];
        $data->taluka = $validator['taluka'];
        $data->village = $validator['village'];
        $data->regional_name = $validator['regional_name'];

        $result = $data->save();
        if ($result) {
            return response()->json(['status' => true, 'message' => "Village updated successfully", 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "Error while updating village", 'code' => 500]);
        }
    }
}
