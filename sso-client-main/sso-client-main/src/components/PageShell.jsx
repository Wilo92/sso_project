import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

export default function PageShell({ children }) {
  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>{children}</Box>
    </Container>
  );
}
