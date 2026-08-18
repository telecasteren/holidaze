import { createFileRoute } from '@tanstack/react-router'
import { brandSettings } from '@/lib/brand/brandSettings'
import { venueByIdQuery } from "@/lib/queries/venuesQuery";
import type { Venue } from "../../../services/models/Venue";

export const Route = createFileRoute('/venues/$venueId')({
  loader: async ({ context, params }): Promise<Venue> => {
    const data = await context.queryClient.ensureQueryData(
      venueByIdQuery(params.venueId),
    );
    return data.data;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        name: "description",
        content: `Venue details for ${loaderData?.name ?? "Venue"} at ${brandSettings.name}.`,
      },
      { title: loaderData?.name ?? "Venue" },
    ],
  }),
  component: VenueById,
})

function VenueById() {
  const venue = Route.useLoaderData();
  const hasRatings = venue.rating > 0;

  return (
    <div>
      <h1>{venue.name}</h1>
      <p>{hasRatings ? "Has ratings" : "No ratings"}</p>
    </div>
  );
}
