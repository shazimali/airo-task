<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Repositories\AuthRepository;
use App\Services\AuthService;

class AuthController extends Controller
{
   public  function __construct(protected AuthRepository $authRepository)
    {

    }
    public function register(RegisterUserRequest $request){
       
        return $this->authRepository->register($request->all());
    
    }

    public function login(LoginUserRequest $request) {
        
        return $this->authRepository->login($request->all());
   
    }

    public function logout() {
        
        return $this->authRepository->logout();
   
    }
}
