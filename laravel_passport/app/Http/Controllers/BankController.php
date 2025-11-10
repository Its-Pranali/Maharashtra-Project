<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bank;

class BankController extends Controller
{
    public function index()
    {
        $data = Bank::where('status', 1)->get();
        if (!empty($data)) {
            return response()->json(['message' => $data, 'code' => 200, 'status' => true]);
        } else {
            return response()->json(['message' => "Data not found", 'code' => 500, 'status' => false]);
        }
    }

    public function save(Request $request)
    {
        $validator = $request->validate([
            'district' => 'required|string|max:255',
            'bank_name' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);

        $data = Bank::create($validator);

        if (!empty($data)) {
            return response()->json(['message' => $data, 'status' => true, 'code' => 200]);
        } else {
            return response()->json(['message' => "Error while saving the data", 'status' => false, 'code' => 500]);
        }
    }

    public function update(Request $request, $id)
    {
        $data = Bank::find($id);

        if (!$data) {
            return response()->json(['status' => false, 'message' => "data not found", 'code' => 500]);
        }

        $validator = $request->validate([
            'district' => 'required|string|max:255',
            'bank_name' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);
        $data->district = $validator['district'];
        $data->bank_name = $validator['bank_name'];
        $data->regional_name = $validator['regional_name'];

        $result = $data->save();
        if ($result) {
            return response()->json(['status' => true, 'message' => "bank updated successfully", 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "Error while updating bank", 'code' => 500]);
        }
    }

    public function delete($id)
    {
        $data = Bank::findOrFail($id);
        $data->status = 0;
        $result = $data->save();

        if ($result) {
            return response()->json(['status' => true, 'message' => "bank deleted successfully", 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "error while delete the bank", 'code' => 500]);
        }
    }
}
