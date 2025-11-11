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
}
