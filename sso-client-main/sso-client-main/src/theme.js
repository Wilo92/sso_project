export const themeOptions = {
  palette: {
    mode: "dark",
    primary: { main: "#ff7a18" },
    secondary: { main: "#7aa5ff" },
    background: { default: "#0b0f17", paper: "#111827" },
  },
  shape: { borderRadius: 14 },
  typography: {
    fontFamily:
      'Inter, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial',
    h1: { fontSize: "2rem", fontWeight: 700 },
    h2: { fontSize: "1.6rem", fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiButton: { styleOverrides: { root: { borderRadius: 12 } } },
    MuiCard: { styleOverrides: { root: { borderRadius: 16 } } },
    MuiTextField: { defaultProps: { variant: "outlined", fullWidth: true } },
  },
};
