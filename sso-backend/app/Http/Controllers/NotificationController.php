<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\OtpCode;
use Carbon\Carbon;
use Twilio\Rest\Client as TwilioClient;
use Illuminate\Support\Facades\Mail;

class NotificationController extends Controller
{
    // send generic message or OTP
    // expects: canal (sms|whatsapp|email), destino (phone or email), tipo (otp|message), mensaje (opcional)
    public function send(Request $request)
    {
        $request->validate([
            'canal' => 'required|string|in:sms,whatsapp,email',
            'tipo' => 'required|string|in:otp,message',
            'destino' => 'required|string',
            'mensaje' => 'nullable|string',
            'user_id' => 'nullable|integer'
        ]);

        $canal = $request->canal;
        $tipo = $request->tipo;
        $destino = $request->destino;

        // If tipo === 'otp', create an OTP entry and send that code
        if ($tipo === 'otp') {
            // Must have user_id (preferred) or search user by phone/email
            $user = null;
            if ($request->user_id) {
                $user = User::find($request->user_id);
                if (! $user) return response()->json(['message' => 'Usuario no encontrado'], 404);
            } else {
                // try find by phone or email
                if ($canal === 'email') {
                    $user = User::where('email', $destino)->first();
                } else {
                    $user = User::where('phone', $destino)->first();
                }
            }

            if (! $user) return response()->json(['message' => 'Usuario no encontrado para OTP'], 404);

            $code = rand(100000, 999999); // 6 dígitos
            $expiresAt = Carbon::now()->addMinutes(5);

            OtpCode::create([
                'user_id' => $user->id,
                'code' => (string)$code,
                'expires_at' => $expiresAt,
                'used' => false,
            ]);

            $body = "Tu código OTP es: {$code}. Expira en 5 minutos.";
        } else {
            // mensaje genérico
            $body = $request->mensaje ?? 'Notificación desde SSO';
        }

        // send via Twilio for sms/whatsapp
        if ($canal === 'sms' || $canal === 'whatsapp') {
            $sid = config('services.twilio.sid') ?? env('TWILIO_SID');
            $token = config('services.twilio.token') ?? env('TWILIO_TOKEN');
            $from = config('services.twilio.from') ?? env('TWILIO_FROM');

            $client = new TwilioClient($sid, $token);

            $to = $destino;
            // if whatsapp, Twilio expects 'whatsapp:+1234...' for the to/from
            if ($canal === 'whatsapp') {
                $to = "whatsapp:{$destino}";
                $from = "whatsapp:{$from}";
            }

            $message = $client->messages->create($to, [
                'from' => $from,
                'body' => $body
            ]);

            return response()->json(['sid' => $message->sid, 'status' => 'sent']);
        }

        // send via email
        if ($canal === 'email') {
            Mail::raw($body, function ($m) use ($destino) {
                $m->to($destino)->subject('Notificación SSO');
            });

            return response()->json(['status' => 'email_sent']);
        }

        return response()->json(['message' => 'Canal no soportado'], 400);
    }
}
