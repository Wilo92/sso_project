<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Auth;
use Twilio\Rest\Client;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function loginV1(Request $request)
    {
        $credentials = $request->only('document', 'password');
        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        return response()->json([
            'tokenJWT' => $token,
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }

    public function loginV2(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if (!$token = Auth::attempt($credentials)) {
            return response()->json(['error' => 'Credenciales incorrectas'], 401);
        }

        return response()->json([
            'tokenJWT' => $token,
            'expires_in' => Auth::factory()->getTTL() * 60
        ]);
    }

    public function generateOtp(Request $request)
    {
        $request->validate(['phone' => 'required|string']);

        $phone = str_replace(['whatsapp:', '+'], '', $request->phone);
        $phone = '+' . $phone; // Formato internacional
        $otp = rand(100000, 999999);

        Cache::put('otp_' . $phone, $otp, now()->addMinutes(5));

        try {
            $twilio = new Client(env('TWILIO_SID'), env('TWILIO_AUTH_TOKEN'));
            $twilio->messages->create(
                'whatsapp:' . $phone,
                [
                    'from' => env('TWILIO_PHONE'),
                    'body' => "🔐 Tu código OTP es: $otp (válido por 5 minutos)"
                ]
            );

            return response()->json([
                'status' => 'ok',
                'message' => 'Código OTP enviado por WhatsApp',
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo enviar el mensaje',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function loginV3(Request $request)
    {
        $request->validate([
            'phone' => 'required|string',
            'otp' => 'required|string'
        ]);

        $phone = str_replace(['whatsapp:', '+'], '', $request->phone);
        $phone = '+' . $phone;

        $cachedOtp = Cache::get('otp_' . $phone);

        if (!$cachedOtp || $cachedOtp != $request->otp) {
            return response()->json(['error' => 'OTP inválido o expirado'], 401);
        }

        $user = \App\Models\User::where('phone', $phone)->first();
        if (!$user) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $token = auth()->login($user);
        Cache::forget('otp_' . $phone);

        return response()->json([
            'tokenJWT' => $token,
            'expires_in' => auth()->factory()->getTTL() * 60
        ]);
    }

    public function refresh()
    {
        try {
            $newToken = auth()->refresh();
            return response()->json(['tokenJWT' => $newToken]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Refresh token inválido o expirado'], 401);
        }
    }

    public function me()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json($user);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        }
    }

    public function logout()
    {
        auth()->logout();
        return response()->json(['message' => 'Sesión cerrada correctamente']);
    }
}
