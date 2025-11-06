<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Designation;

class DesignationController extends Controller
{
    /**
     * Display a listing of the active designations.
     */
    public function index()
    {
        $designations = Designation::where('status', 1)->get();

        return response()->json($designations, 200);
    }

    /**
     * Store a newly created designation in storage.
     */
    public function save(Request $request)
    {
        $validatedData = $request->validate([
            'designation' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);

        $designation = Designation::create($validatedData);

        return response()->json([
            'message' => 'Designation created successfully',
            'data' => $designation,
        ], 201);
    }

    /**
     * Update the specified designation in storage.
     */
    public function update(Request $request, $id)
    {
        $designation = Designation::find($id);

        if (!$designation) {
            return response()->json(['message' => 'Designation not found'], 404);
        }

        $validatedData = $request->validate([
            'designation' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);

        $designation->update($validatedData);

        return response()->json([
            'message' => 'Designation updated successfully',
            'data' => $designation,
        ], 200);
    }

    public function delete($id)
    {
        $data = Designation::findOrFail($id);
        // $district->delete();
        $data->status = 0;  ## 0- deleted 1- active
        $res = $data->save();
        if ($res) {
            return response()->json(['message' => 'Deleted successfully', 'code' => 200, 'status' => true]);
        } else {
            return response()->json(['message' => 'Error While Deleting Record', 'code' => 200, 'status' => true]);
        }
    }
}
