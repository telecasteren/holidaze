import { createFileRoute } from '@tanstack/react-router'
import Divider from '@mui/material/Divider';

export const Route = createFileRoute('/account')({
  component: Account,
  notFoundComponent: () => {
     return <p>This page doesn't exist.</p>
   },
})

function Account() {
  return (

      <div>
        This will be the ACCOUNT page.
        <Divider />
      </div>

  );
}
