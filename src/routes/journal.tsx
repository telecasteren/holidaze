import { createFileRoute } from '@tanstack/react-router'
import { Container, Divider } from '@mui/material';

export const Route = createFileRoute('/journal')({
  component: Journal,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Journal() {
  return (
    <Container id="services" sx={{ py: { xs: 8, sm: 16 } }}>
      <p>This will be the BLOG page.
        Here comes news and stuff.</p>
        <Divider />
      </Container>
  );
}
