import { useState } from "react";
import PageShell from "../components/PageShell";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../context/AuthContext";

export default function LoginOTP() {
  const { loginV3, sendOtp, loading } = useAuth();
  const [etapa, setEtapa] = useState("inicio"); // inicio | codigo | ok
  const [codigoOTP, setCodigoOTP] = useState("");
  const [error, setError] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Enviar OTP
  const solicitar = async () => {
    setError("");
    try {
      await sendOtp({ phone: whatsapp });
      setEtapa("codigo");
    } catch (e) {
      console.error(e);
      setError("No se pudo enviar el OTP por medio de WhatsApp.");
    }
  };

  // Validar OTP
  const validar = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginV3({ phone: whatsapp, otp: codigoOTP });
      setEtapa("ok");
    } catch (e) {
      console.error(e);
      setError("OTP inválido o expirado.");
    }
  };

  return (
    <PageShell>
      <Typography variant="h4" gutterBottom>
        Ingreso con código OTP
      </Typography>

      <Stack spacing={3} sx={{ maxWidth: 400 }}>
        {etapa === "inicio" && (
          <>
            <TextField
              label="Número de WhatsApp"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              helperText="Ejemplo: +57 300 1234567"
            />
            <Button
              onClick={solicitar}
              disabled={loading || !whatsapp.startsWith("+57")}
              variant="contained"
            >
              {loading ? <CircularProgress size={20} /> : "Enviar código OTP"}
            </Button>
          </>
        )}

        {etapa === "codigo" && (
          <form onSubmit={validar}>
            <Stack spacing={2}>
              <TextField
                label="Código recibido"
                value={codigoOTP}
                onChange={(e) => setCodigoOTP(e.target.value)}
                inputProps={{ maxLength: 6 }}
              />
              <Button
                type="submit"
                variant="contained"
                disabled={loading || codigoOTP.length < 4}
                startIcon={loading ? <CircularProgress size={18} /> : null}
              >
                Validar código
              </Button>
            </Stack>
          </form>
        )}

        {etapa === "ok" && (
          <Alert severity="success">
            ✅ Verificación exitosa. Bienvenido al sistema.
          </Alert>
        )}

        {error && <Alert severity="error">{error}</Alert>}
      </Stack>
    </PageShell>
  );
}
