import { useState } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router'
import { brandSettings } from '@/lib/brand/brandSettings'
import { profileByIdQuery } from "@/lib/queries/profilesQuery";
import { venuesByProfileQuery } from "@/lib/queries/venuesQuery";
import type { Profile } from "@/lib/zod/index";

import { Container, Stack, Tabs, Tab, Divider } from '@mui/material';
import { AccountInfo } from '@/components/account/AccountInfo';
import { BookingInfo } from '@/components/account/BookingInfo';
import { VenueInfo } from '@/components/account/VenueInfo';
import { AccountHero } from '@/components/account/AccountHero';

export const Route = createFileRoute('/account/$profileId')({
  beforeLoad({ context }) {
    if (!context.user) throw redirect({ to: "/auth/login" })
  },
  loader: async ({ context, params }): Promise<Profile> => {
    const data = await context.queryClient.ensureQueryData(
      profileByIdQuery(params.profileId),
      );
    if (data.data.venueManager) {
      const venuesData = await context.queryClient.ensureQueryData(venuesByProfileQuery(params.profileId))
      return { ...data.data, venues: venuesData.data };
    }
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

const availableDirectories = {
  account: "Account",
  bookings: "Bookings",
  venues: "Venues",
} as const;

type DirectoryKey = keyof typeof availableDirectories;

function ProfileById() {
  const user = Route.useLoaderData();
  const [activeTab, setActiveTab] = useState<DirectoryKey>("account");
  const hasVenueManagerRole = user.venueManager;
  const venueInfo = user.venues ?? [];

  return (
    <>
    <Container id="profile-details" sx={{ py: { xs: 8, sm: 16 } }}>
      <AccountHero user={user} />

      <Stack id="profile-tabs" sx={{ mt: 2, spaceBetween: 1 }}>
        <Tabs
          value={activeTab}
          onChange={(_, newTab: DirectoryKey) => setActiveTab(newTab)}>
            {Object.entries(availableDirectories).map(([key, label]) => {
              if (key === "venues" && !hasVenueManagerRole) return null;
              return <Tab key={key} value={key} label={label} />
            })}
          </Tabs>

          <Stack sx={{ p: "1rem", border: "1px solid #ccc", borderRadius: "4px", mb: 2 }}>
            {activeTab === 'account' && (
              <AccountInfo user={user} isManager={hasVenueManagerRole} />
            )}

            {activeTab === 'bookings' && (
              <BookingInfo />
            )}

            {activeTab === 'venues' &&
              hasVenueManagerRole &&
              (
              <VenueInfo venueInfo={venueInfo} />
            )}
          </Stack>
      </Stack>
    </Container>
    <Divider />
    </>
  )
}
