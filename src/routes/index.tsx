import { createFileRoute } from "@tanstack/react-router";
import { CustomPending } from "@/lib/route-states/CustomPending";

import Divider from "@mui/material/Divider";
import { Reviews, Services, Hero, FAQ } from "@/components/dashboard/index";
import { venuesQuery } from "@/lib/queries/venuesQuery";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const data = await context.queryClient.query(venuesQuery(1, "", 1, "", ""));
    return data;
  },
  head: () => {
    // Hero image rendered in Hero.tsx
    const url = "/hero/ishan-seefromthesky-qE1Y8GQKhEk-unsplash.webp";
    return {
      links: [
        { rel: "preload", as: "image", href: url, fetchPriority: "high" },
      ],
    };
  },
  component: Dashboard,
  pendingComponent: CustomPending,
});

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
  );
}
