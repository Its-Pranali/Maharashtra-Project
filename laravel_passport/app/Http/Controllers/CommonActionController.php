<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CommonActionController extends Controller
{
    function buildResponse($data)
    {
        return sendReposne($data);
    }
}
