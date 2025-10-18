import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PageShell from "../components/PageShell";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

export default function LoginV1() {
  const { loginV1, loading, error } = useAuth();
  const [form, setForm] = useState({ document: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginV1(form);
  };

  return (
    <PageShell>
      <Typography variant="h4" gutterBottom>
        Login v1
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Documento"
            value={form.document}
            onChange={(e) => setForm({ ...form, document: e.target.value })}
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
