<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Role;

class RoleController extends Controller
{
    public function index()
    {
        $data = Role::all();
        return response()->json($data);
    }

    public function save(Request $request)
    {
        $validator = $request->validate([
            'role_name' => 'required|string|max:255',
            'status' => 'required|string',
        ]);

        $data = Role::create($validator);
        return response()->json(['message' => "data saved successfully", 'data' => $data], 201);
    }
}
