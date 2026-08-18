import { createFileRoute } from '@tanstack/react-router'
import Divider from '@mui/material/Divider';
import Hero from '@/components/dashboard/Hero';
import Services from '@/components/dashboard/Services';
import Reviews from '@/components/dashboard/Reviews';
import FAQ from '@/components/dashboard/FAQ';

export const Route = createFileRoute('/')({ component: Dashboard })

function Dashboard() {
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
  )
}
