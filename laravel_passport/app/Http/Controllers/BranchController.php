<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    public function index()
    {
        $data = Branch::where('status', 1)->get();
        if (!empty($data)) {
            return response()->json(['status' => true, 'message' => $data, 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'messsage' => "data not found", 'code' => 500]);
        }
    }

    public function save(Request $request)
    {
        $validator = $request->validate([
            'district' => 'required|string|max:255',
            'branch_name' => 'required|string|max:255',
        ]);
        $data = Branch::create($validator);

        if (!empty($data)) {
            return response()->json(['status' => true, 'message' => "branch saved successfully", 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "Error while saving branch", 'code' => 500]);
        }
    }

    public function update(Request $request, $id)
    {
        $data = Branch::find($id);

        if (!$data) {
            return response()->json(['status' => false, 'message' => "data not found", 'code' => 500]);
        }

        $validator = $request->validate([
            'district' => 'required|string|max:255',
            'branch_name' => 'required|string|max:255',
        ]);

        $data->district = $validator['district'];
        $data->branch_name = $validator['branch_name'];

        $result = $data->save();
        if ($result) {
            return response()->json(['status' => true, 'message' => "Branch updated successfully", 'code' => 500]);
        } else {
            return response()->json(['status' => false, 'message' => "Error while updating branch", 'code' => 500]);
        }
    }

    public function delete($id)
    {
        $data = Branch::findOrFail($id);
        $data->status = 0;
        $result = $data->save();
        if ($result) {
            return response()->json(['status' => true, 'message' => "Branch deleted successfully", 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "Error While delete the branch", 'code' => 500]);
        }
    }
}
