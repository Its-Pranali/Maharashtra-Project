<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\District;

class DistrictController extends Controller
{
    public function index()
    {
        return response()->json(District::select('*')->where('status', 1)->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'district' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);
        $district = District::create([
            'district' => $request->district,
            'regional_name' => $request->regional_name,
        ]);
        return response()->json($district, 201);
    }

    // public function update(Request $request, $id)
    // {
    //     $request->validate([
    //         'district' => 'required|string|max:255',
    //         'regional_name' => 'required|string|max:255'
    //     ]);
    //     $district = District::findOrFail($id);
    //     $district->update([
    //         'district' => $request->district,
    //         'regional_name' => $request->regional_name
    //     ]);
    //     return response()->json($district);
    // }

    public function update(Request $request, $id)
    {
        $request->validate([
            'district' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255'
        ]);

        $district = District::find($id);

        if (!$district) {
            return response()->json([
                'status' => false,
                'message' => 'District not found',
                'code' => 404
            ]);
        }

        $district->district = $request->district;
        $district->regional_name = $request->regional_name;

        $updated = $district->save();

        if ($updated) {
            return response()->json(['status' => true, 'message' => 'District updated successfully', 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => 'Error while updating district', 'code' => 500]);
        }
    }


    public function destroy($id)
    {
        $district = District::findOrFail($id);
        // $district->delete();
        $district->status = 0;  ## 0- deleted 1- active
        $res = $district->save();
        if ($res) {
            return response()->json(['message' => 'Deleted successfully', 'code' => 200, 'status' => true]);
        } else {
            return response()->json(['message' => 'Error While Deleting Record', 'code' => 200, 'status' => true]);
        }
    }
}
