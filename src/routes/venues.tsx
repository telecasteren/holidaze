import { createFileRoute } from '@tanstack/react-router'

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../components/shared-theme/AppTheme';

export const Route = createFileRoute('/venues')({
  component: Venues,
})

export default function Venues(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <div>
        This will be the VENUES page.
        <Divider />
      </div>

    </AppTheme>
  );
}
