import { createFileRoute } from '@tanstack/react-router'
import { brandSettings } from '@/lib/brand/brandSettings'
import { profileByIdQuery } from "@/lib/queries/profilesQuery";
import type { Profile } from "../../../services/models/Profile";

import { Container } from '@mui/material';

export const Route = createFileRoute('/account/$profileId')({
  loader: async ({ context, params }): Promise<Profile> => {
    const data = await context.queryClient.ensureQueryData(
      profileByIdQuery(params.profileId),
    );
    return data.data;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        name: "description",
        content: `Account details for ${loaderData?.name ?? "Account"} at ${brandSettings.name}.`,
      },
      { title: loaderData?.name ?? "Account" },
    ],
  }),
  component: ProfileById,
})

function ProfileById() {
  const user = Route.useLoaderData();

  return (
    <Container id="profile-details" sx={{ py: { xs: 8, sm: 16 } }}>
      <h1 key={user.name}>Hello, {user.name}!</h1>
      <p>{user.email}</p>
    </Container>
  )
}
