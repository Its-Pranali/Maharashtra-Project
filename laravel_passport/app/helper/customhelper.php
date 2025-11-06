<?php
use Illuminate\Support\Facades\DB;

if (!function_exists('sendReposne')) {
    function sendReposne($data)
    {
        if(!empty($data)){
            return response()->json(['message' => $data,"code"=>200,"status"=>True]);
        }else{
            return response()->json(['message' => "Data Not Found ","code"=>404,"status"=>False]);
        }
    }
}