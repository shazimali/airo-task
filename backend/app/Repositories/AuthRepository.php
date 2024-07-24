<?php

namespace App\Repositories;

use App\Interfaces\AuthInterface;
use App\Models\User;

class AuthRepository implements AuthInterface
{
    function register(array $data) {
        try {
            User::create($data);   
            return response()->json('Successfully registered, please login to proceed.',200);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(),201);
        }
    
    }

    function login(array $data) {
        
        try {
            if(! $token = auth()->attempt($data)){
                return response()->json('Unauthorized', 401);
            }
    
            return response()->json([
                'user' => auth()->user()->name,
                'token' => $token,
                'token_type' => 'bearer',
                'token_expires_in' => auth()->factory()->getTTL() * 60
                
           ]);
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(),201);
        }
        
    }

    function logout() {
        try {
            
             auth()->logout();
            return response()->json('Successfully Logout.',200);
            
        } catch (\Throwable $th) {
            return response()->json($th->getMessage(),201);
        }
    }
}
