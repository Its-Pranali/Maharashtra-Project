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

    public function update(Requset $reuest,$id){
        $data=Role::find($id);
        if(!$data){
            return response()->json(['status'=>false,'message'=>"data not found",'code'=>500]);
        }

        $validator=$request->validate([
            'role_name'=>'required|string|max:255',
            'status'=>'required|string|max:255',
        ]);
        $data->role_name=$validate['role_name'];
        $data->status=$validate['status'];

        $result= $data->save();
        if($result){
            return response()->json(['status'=>true,'message'=>"Role updated successfully",'code'=>200]);
        }
        else{
            return response()->json(['status'=>false,'message'=>"Error while updating role",'code'=>500]);
        }
    }
}


