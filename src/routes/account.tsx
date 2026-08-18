import { createFileRoute } from '@tanstack/react-router'

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../components/shared-theme/AppTheme';

export const Route = createFileRoute('/account')({
  component: Account,
})


export default function Account(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <div>
        This will be the ACCOUNT page.
        <Divider />
      </div>

    </AppTheme>
  );
}
