import { createFileRoute } from '@tanstack/react-router'
import { Container, Divider } from '@mui/material';

export const Route = createFileRoute('/booking/')({
  component: Booking,
})

function Booking() {
  return (
    <Container id="booking" sx={{ py: { xs: 8, sm: 16 } }}>
      <p>This will be the BOOKING page.</p>

      <Divider />
    </Container>
  )
}
