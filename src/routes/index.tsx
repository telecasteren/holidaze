import { createFileRoute } from "@tanstack/react-router";
import { CustomPending } from "@/lib/route-states/CustomPending";

import Divider from "@mui/material/Divider";
import { Reviews, Services, Hero, FAQ } from "@/components/dashboard/index";
import { venuesQuery } from "#/lib/queries/venuesQuery";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData(venuesQuery(1, ""));
    return data;
  },
  head: ({ loaderData }) => {
    const url = loaderData?.data[0]?.media?.[0]?.url;
    return {
      links: url
        ? [{ rel: "preload", as: "image", href: url, fetchPriority: "high" }]
        : [],
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
