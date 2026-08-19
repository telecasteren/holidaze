import { createFileRoute } from '@tanstack/react-router'
import { Container, Divider } from '@mui/material';

export const Route = createFileRoute('/venues/')({
  component: Venues,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Venues() {
  return (
    <Container id="venues" sx={{ py: { xs: 8, sm: 16 } }}>

      <p>This will be the VENUES page.</p>


        <Divider />
    </Container>
  );
}
