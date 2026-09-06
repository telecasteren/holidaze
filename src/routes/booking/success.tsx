import { useAuth } from '@/hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'
import { Button, Container, Typography, Divider } from '@mui/material'
import { PageTitle } from "@/components/layout";

export const Route = createFileRoute('/booking/success')({
  component: BookingSuccess,
  head: () => ({
    meta: [
      {
        name: "booking-success",
        content: "Booking confirmation. Enjoy your coming trip.",
      },
      { title: "Booking confirmed | Holidaze" },
    ],
  }),
})

function BookingSuccess() {
  const { user } = useAuth();
  const profileId = user?.name;

  return (
    <>
    <Container sx={{ py: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <PageTitle title="Booking Success!"/>
      <Typography variant="body1">Your booking has been successfully completed.</Typography>
      <Button variant="contained" href="/venues">Return to venues</Button>
      <Button variant="outlined" href={`/account/${profileId}`}>Go to your account</Button>
    </Container>

    <Divider />
    </>
  )
}
