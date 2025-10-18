<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Twilio\Rest\Client;

/**
 * @OA\Tag(
 *     name="Twilio",
 *     description="Operaciones relacionadas con el envío de mensajes por WhatsApp usando Twilio"
 * )
 */
class TwilioController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/twilio/send-otp",
     *     summary="Enviar código OTP de prueba por WhatsApp",
     *     tags={"Twilio"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"phone"},
     *             @OA\Property(property="phone", type="string", example="+573003553762")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Mensaje enviado correctamente"),
     *     @OA\Response(response=500, description="Error al enviar mensaje")
     * )
     */
    public function sendOtp(Request $request)
    {
        $request->validate(['phone' => 'required|string']);
        $otp = rand(100000, 999999);

        try {
            $twilio = new Client(env('TWILIO_SID'), env('TWILIO_AUTH_TOKEN'));
            $twilio->messages->create(
                'whatsapp:' . $request->phone,
                [
                    'from' => env('TWILIO_PHONE'),
                    'body' => "🔐 Tu código OTP de prueba es: $otp"
                ]
            );

            return response()->json([
                'status' => 'ok',
                'message' => 'Código OTP enviado correctamente',
                'otp' => $otp // puedes ocultarlo en producción
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'No se pudo enviar el mensaje',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
