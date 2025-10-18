import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";
import PageShell from "../components/PageShell";

export default function Home() {
  const cards = [
    { title: "Login v1", path: "/login-v1", variant: "contained" },
    { title: "Login v2", path: "/login-v2", variant: "outlined" },
    { title: "Login OTP", path: "/login-v3", variant: "text" },
  ];

  return (
    <PageShell>
      <Typography variant="h1" gutterBottom>Bienvenido</Typography>
      <Typography variant="body1" sx={{ opacity: 0.8, mb: 3 }}>
        Elige un método de autenticación o entra a las secciones protegidas.
      </Typography>

      <Grid container spacing={2}>
        {cards.map((x) => (
          <Grid item xs={12} md={4} key={x.title}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>{x.title}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                  Flujo de acceso con validaciones de token.
                </Typography>
              </CardContent>
              <CardActions>
                <Button component={RouterLink} to={x.path} variant={x.variant}>
                  Abrir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageShell>
  );
}
