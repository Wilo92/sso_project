import { useState } from "react";
import PageShell from "../components/PageShell";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import api from "../api/client";

export default function Notifications() {
  const [form, setForm] = useState({ canal: "email", destino: "", mensaje: "" });
  const [resp, setResp] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    const { data } = await api.post("/api/v1/notifications/send", form);
    setResp(JSON.stringify(data, null, 2));
  };

  return (
    <PageShell>
      <Typography variant="h2" gutterBottom>Notificaciones</Typography>
      <form onSubmit={submit}>
        <Stack spacing={2}>
          <TextField
            select
            label="Canal"
            value={form.canal}
            onChange={(e) => setForm({ ...form, canal: e.target.value })}
          >
            <MenuItem value="email">Email</MenuItem>
            <MenuItem value="sms">SMS</MenuItem>
            <MenuItem value="whatsapp">WhatsApp</MenuItem>
          </TextField>
          <TextField
            label="Destino"
            value={form.destino}
            onChange={(e) => setForm({ ...form, destino: e.target.value })}
          />
          <TextField
            label="Mensaje"
            multiline
            minRows={3}
            value={form.mensaje}
            onChange={(e) => setForm({ ...form, mensaje: e.target.value })}
          />
          <Button type="submit" variant="contained">Enviar</Button>
        </Stack>
      </form>

      <Paper
        sx={{
          mt: 2,
          p: 2,
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          fontSize: 13,
          whiteSpace: "pre-wrap",
        }}
      >
        {resp}
      </Paper>
    </PageShell>
  );
}
