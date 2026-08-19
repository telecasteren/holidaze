import { createFileRoute } from '@tanstack/react-router'
import { Container } from '@mui/material';

export const Route = createFileRoute('/booking/calendar')({
  component: Calendar,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Calendar() {
  return (
    <Container id="calendar" sx={{ py: { xs: 8, sm: 16 } }}>
      <p>This will be the CALENDAR page.</p>
    </Container>
  )
}
