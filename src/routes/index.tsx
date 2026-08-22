import { createFileRoute } from '@tanstack/react-router'
import Divider from '@mui/material/Divider';
import { Reviews, Services, Hero, FAQ } from "@/components/index";

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
