<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organization;

class OrganizationController extends Controller
{
    // Fetch active organizations
    public function index()
    {
        $organizations = Organization::where('status', 1)->get();
        return response()->json($organizations);
    }

    // Store new organization
    public function store(Request $request)
    {
        $validated = $request->validate([
            'org_name' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);

        $organization = Organization::create($validated);

        return response()->json([
            'message' => 'Organization created successfully',
            'data' => $organization
        ], 201);
    }

    // Update organization
    // public function update(Request $request, $id)
    // {
    //     $organization = Organization::find($id);

    //     if (!$organization) {
    //         return response()->json(['message' => 'Organization not found'], 404);
    //     }

    //     $validated = $request->validate([
    //         'org_name' => 'required|string|max:255',
    //         'regional_name' => 'required|string|max:255',
    //     ]);

    //     $organization->update($validated);

    //     return response()->json([
    //         'message' => 'Organization updated successfully',
    //         'data' => $organization
    //     ], status: 200);
    // }

    public function update(Request $request, $id)
    {
        $data = Organization::find($id);
        if (!$data) {
            return response()->json(['status' => false, 'message' => "Orgnization not found", 'code' => 500]);
        }
        $validator = $request->validate([
            'org_name' => 'required|string|max:255',
            'regional_name' => 'required|string|max:255',
        ]);
        $data->org_name = $validator['org_name'];
        $data->regional_name = $validator['regional_name'];

        $result = $data->save();
        if ($result) {
            return response()->json(['status' => true, 'message' => "Orgnization updated successfully", 'code' => 200]);
        } else {
            return response()->json(['status' => false, 'message' => "Error while updating organization", 'code' => 500]);
        }
    }

    // Soft delete organization (status = 0)
    public function destroy($id)
    {
        $organization = Organization::find($id);

        if (!$organization) {
            return response()->json(['message' => 'Organization not found'], 404);
        }

        $organization->status = 0;

        if ($organization->save()) {
            return response()->json(['message' => 'Organization deleted successfully'], 200);
        }

        return response()->json(['message' => 'Error while deleting organization'], 500);
    }
}
