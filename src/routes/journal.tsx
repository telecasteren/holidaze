import { createFileRoute } from '@tanstack/react-router'
import Divider from '@mui/material/Divider';

export const Route = createFileRoute('/journal')({
  component: Journal,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Journal() {
  return (
      <div>
        This will be the BLOG page.
        <Divider />
        Here comes news and stuff.
      </div>
  );
}
