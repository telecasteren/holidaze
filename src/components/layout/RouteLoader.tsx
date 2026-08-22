import { Container, CircularProgress } from "@mui/material";

export const RouteLoader = () => {
  return (
    <Container id="loader" sx={{ py: { xs: 8, sm: 16 } }}>
      <CircularProgress aria-label="Loading…" size="3rem" sx={{ justifyContent: 'center' }} />
    </Container>
  );
};
