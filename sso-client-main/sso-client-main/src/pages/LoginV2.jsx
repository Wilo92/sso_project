import { useState } from "react";
import PageShell from "../components/PageShell";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { useAuth } from "../context/AuthContext";

export default function LoginV2() {
  const { loginV2, loading } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await loginV2(form);
    } catch (e) {
      setError("No se pudo iniciar sesión v2");
    }
  };

  return (
    <PageShell>
      <Typography variant="h2" gutterBottom>Login v2</Typography>
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <TextField
            label="Correo"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <TextField
            label="Contraseña"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={18} /> : null}
          >
            Ingresar
          </Button>
          {error && <Alert severity="error">{error}</Alert>}
        </Stack>
      </form>
    </PageShell>
  );
}
