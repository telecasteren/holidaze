import { useAuth } from '@/hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Container, Typography, Divider } from '@mui/material'

export const Route = createFileRoute('/booking/success')({
  component: BookingSuccess,
})

function BookingSuccess() {
  const { user } = useAuth();
  const profileId = user?.name;

  return (
    <>
    <Container sx={{ py: { xs: 8, sm: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 } }}>
      <Typography variant="h4">Booking Success!</Typography>
      <Typography variant="body1">Your booking has been successfully completed.</Typography>
      <Button variant="contained" href="/venues">Return to venues</Button>
      <Button variant="outlined" href={`/account/${profileId}`}>Go to your account</Button>
    </Container>

    <Divider />
    </>
  )
}
