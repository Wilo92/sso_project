import { useState } from "react";
import PageShell from "../components/PageShell";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import api from "../api/client";

export default function RestrictedV1() {
  const [resp, setResp] = useState("");

  const call = async () => {
    const { data } = await api.get("/api/v1/process/restricted");
    setResp(JSON.stringify(data, null, 2));
  };

  return (
    <PageShell>
      <Typography variant="h2" gutterBottom>Área restringida v1</Typography>
      <Button variant="contained" onClick={call}>Probar endpoint</Button>
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
