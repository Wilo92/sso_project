<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use App\Http\Controllers\TwilioController;


Route::post('/twilio/send-otp', [TwilioController::class, 'sendOtp']);


Route::post('/v1/login', [AuthController::class, 'loginV1']);


Route::post('/v2/login', [AuthController::class, 'loginV2']);


Route::post('/v3/login', [AuthController::class, 'loginV3']);


Route::post('/otp/generate', [AuthController::class, 'generateOtp']);


Route::post('/refresh', [AuthController::class, 'refresh']);


Route::middleware('api')->group(function () {

   
    Route::get('/me', function () {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            if (!$user) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }
            return response()->json($user);
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (\PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token no encontrado', 'detalle' => $e->getMessage()], 401);
        }
    });

    
    Route::post('/logout', [AuthController::class, 'logout']);
});
