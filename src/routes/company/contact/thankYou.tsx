import { createFileRoute } from '@tanstack/react-router'
import { Button, Container, Typography } from '@mui/material'

export const Route = createFileRoute('/company/contact/thankYou')({
  component: ThankYouComponent,
})

function ThankYouComponent() {
  return (
    <Container sx={{ py: { xs: 8, sm: 16, display: "flex", flexDirection: "column", alignItems: "center", gap: 20 } }}>
      <Typography variant="h4">Thank you for your message</Typography>
      <Typography variant="body1">We will get back to you soon.</Typography>
      <Button variant="contained" href="/venues">Return to venues</Button>
    </Container>
  )
}
