import { createFileRoute } from '@tanstack/react-router'

import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../components/shared-theme/AppTheme';

export const Route = createFileRoute('/journal')({
  component: Journal,
})

export default function Journal(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <div>
        This will be the BLOG page.
        <Divider />
        Here comes news and stuff.
      </div>

    </AppTheme>
  );
}
