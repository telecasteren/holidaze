import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../shared-theme/AppTheme';

import Hero from './Hero';
import Services from './Services';
import Reviews from './Reviews';
import FAQ from './FAQ';

export default function Dashboard(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <Hero />
      <div>
        <Services />
        <Divider />
        <Reviews />
        <Divider />
        <FAQ />
        <Divider />
      </div>

    </AppTheme>
  );
}
