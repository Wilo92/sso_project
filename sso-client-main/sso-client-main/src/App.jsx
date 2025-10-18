import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { themeOptions } from "./theme";
import TopBar from "./components/TopBar";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import LoginV1 from "./pages/LoginV1";
import LoginV2 from "./pages/LoginV2";
import LoginOTP from "./pages/LoginOTP";
import RestrictedV1 from "./pages/RestrictedV1";
import RestrictedV2 from "./pages/RestrictedV2";
import Notifications from "./pages/Notifications";

const theme = createTheme(themeOptions);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TopBar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login-v1" element={<LoginV1 />} />
        <Route path="/login-v2" element={<LoginV2 />} />
        <Route path="/login-otp" element={<LoginOTP />} />

        <Route
          path="/restricted-v1"
          element={
            <ProtectedRoute>
              <RestrictedV1 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/restricted-v2"
          element={
            <ProtectedRoute>
              <RestrictedV2 />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ThemeProvider>
  );
}
