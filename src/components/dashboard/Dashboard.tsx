import Divider from '@mui/material/Divider';
import Hero from './Hero';
import Services from './Services';
import Reviews from './Reviews';
import FAQ from './FAQ';

export default function Dashboard() {
  return (
    <>
      <Hero />
      <div>
        <Services />
        <Divider />
        <Reviews />
        <Divider />
        <FAQ />
        <Divider />
      </div>
    </>
  );
}
