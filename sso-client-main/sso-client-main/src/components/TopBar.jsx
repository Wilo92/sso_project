import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function TopBar() {
  const { user, logout } = useAuth();

  return (
    <AppBar
      position="sticky"
      color="transparent"
      elevation={0}
      sx={{ borderBottom: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(6px)" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 0.3 }}>
          SSO • Demo
        </Typography>
        <Stack direction="row" spacing={1}>
          {!user ? (
            <>
              <Button component={RouterLink} to="/login-v1" variant="contained">Login v1</Button>
              <Button component={RouterLink} to="/login-v2" variant="outlined">Login v2</Button>
              <Button component={RouterLink} to="/login-otp" variant="text">Login OTP</Button>
            </>
          ) : (
            <>
              <Button component={RouterLink} to="/restricted-v1" variant="contained">Restricted v1</Button>
              <Button component={RouterLink} to="/restricted-v2" variant="outlined">Restricted v2</Button>
              <Button component={RouterLink} to="/notifications" variant="text">Notificaciones</Button>
              <Button onClick={logout} color="secondary">Salir</Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
