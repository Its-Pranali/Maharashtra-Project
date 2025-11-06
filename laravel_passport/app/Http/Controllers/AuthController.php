<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name'     => 'required|string|max:255',
            'email'    => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken('API Token')->accessToken;

        return response()->json(['token' => $token], 201);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $credentials = $request->only('email', 'password');

        if (!Auth::attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = Auth::user();

        // Create access token
        $tokenResult = $user->createToken('API Token');

        // Set token expiry to 5 minutes
        $token = $tokenResult->token;
        $token->expires_at = now()->addMinutes(5);
        $token->save();

        return response()->json([
            'token' => $tokenResult->accessToken,      // This is the actual Bearer token
            'token_type' => 'Bearer',
            'expires_at' => $token->expires_at->toDateTimeString(),
            'user' => $user
        ]);
        // npm run dev -- --host=192.168.0.135 --port=5173

        // $res = [
        //     'token' => $tokenResult->accessToken,      // This is the actual Bearer token
        //     'token_type' => 'Bearer',
        //     'expires_at' => $token->expires_at->toDateTimeString(),
        //     'user' => $user
        // ];
        // print_r($res);
        // die;
    }

    // public function login(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');

    //     if (!Auth::attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     $token = Auth::user()->createToken('API Token')->plainTextToken;

    //     return response()->json(['token' => $token], 200);
    // }

    // public function login(Request $request)
    // {
    //     $credentials = $request->only('email', 'password');

    //     if (!Auth::attempt($credentials)) {
    //         return response()->json(['error' => 'Unauthorized'], 401);
    //     }

    //     $user = Auth::user();

    //     // ✅ This returns the actual token string
    //     $token = $user->createToken('API Token')->plainTextToken;

    //     return response()->json(['token' => $token], 200);
    // }

    public function user(Request $request)
    {
        // print_r($request->all());die;
        return response()->json($request->user());
    }

    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        return response()->json(['message' => 'Successfully logged out']);
    }
}
