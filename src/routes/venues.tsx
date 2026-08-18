import { createFileRoute } from '@tanstack/react-router'
import Divider from '@mui/material/Divider';

export const Route = createFileRoute('/venues')({
  component: Venues,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Venues() {
  return (
      <div>
        This will be the VENUES page.
        <Divider />
      </div>
  );
}
