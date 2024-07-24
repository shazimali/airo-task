<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\QuotationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
});


    Route::prefix('/auth')->group(function () {
        Route::post('/register',[AuthController::class, 'register']);
        Route::post('/login',[AuthController::class, 'login']);
        Route::post('/logout',[AuthController::class, 'logout'])->middleware('auth:api');
    });

    Route::post('/quotation',[QuotationController::class,'getQuotation'])->middleware('auth:api');
