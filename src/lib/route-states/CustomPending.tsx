import { RouteLoader } from "@/components/layout/RouteLoader";
import { Container, Box } from "@mui/material";

export const CustomPending = () => {
  return (
    <Container role="status" aria-label="Loading">
      <h2>Loading your next adventure...</h2>
      <Box role="spinbutton">
        <RouteLoader />
      </Box>
    </Container>
  );
};
