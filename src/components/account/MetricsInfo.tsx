import { Stack, Box, Typography, Divider } from "@mui/material";

export const MyTripsInfo = () => {
  const earningsTotal = 45600; // make function to extract and calculate bookings price per night * totalNights

  return (
    <Stack>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Total earnings: {earningsTotal}
      </Typography>

      <Divider />

      <Box>
        <Typography variant="body1">Very good work!</Typography>
      </Box>
    </Stack>
  );
};
