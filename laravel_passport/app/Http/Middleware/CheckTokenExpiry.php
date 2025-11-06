<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckTokenExpiry
{
    public function handle(Request $request, Closure $next)
    {
        $token = $request->user()?->token();

        if ($token && $token->expires_at && now()->greaterThan($token->expires_at)) {
            $token->revoke(); // Optional: revoke the token if expired
            return response()->json(['error' => 'Token expired'], 401);
        }

        return $next($request);
    }
}
