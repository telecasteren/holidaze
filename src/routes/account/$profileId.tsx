import { useState, lazy, Suspense } from "react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { CustomError, DefaultNotFound } from "@/lib/route-states/index";
import { brandSettings } from "@/lib/brand/brandSettings";
import { profileByIdQuery } from "@/lib/queries/profilesQuery";
import { venuesByProfileQuery } from "@/lib/queries/venuesQuery";
import { availableDirectories } from "@/lib/directories";
import type { DirectoryKey } from "@/lib/directories";
import type { Profile } from "@/lib/zod/index";

import {
  Container,
  Stack,
  Tabs,
  Tab,
  Divider,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
} from "@mui/material";
import { RouteLoader } from "@/components/layout";
import { AccountInfo } from "@/components/account/AccountInfo";
import { MyTripsInfo } from "@/components/account/MyTripsInfo";
import { AccountHero } from "@/components/account/AccountHero";
import { MetricsInfo } from "@/components/account/MetricsInfo";
import { SkeletonAccount } from "@/components/account/SkeletonAccount";

// lazy imports - these files import large chunks (VenueForm, tiptap etc.)
const VenueInfo = lazy(() =>
  import("@/components/account/VenueInfo").then((m) => ({
    default: m.VenueInfo,
  })),
);
const BookingsInfo = lazy(() =>
  import("@/components/account/BookingsInfo").then((m) => ({
    default: m.BookingsInfo,
  })),
);

export const Route = createFileRoute("/account/$profileId")({
  beforeLoad({ context }) {
    if (!context.user) throw redirect({ to: "/auth/login" });
  },
  loader: async ({ context, params }) => {
    const account = await context.queryClient.query(
      profileByIdQuery(params.profileId),
    );
    if (account.data.venueManager) {
      await context.queryClient.query(venuesByProfileQuery(params.profileId));
    }
  },
  head: ({ params }) => ({
    meta: [
      {
        name: "description",
        content: `Account details for ${params.profileId || "this account"} at ${brandSettings.name}.`,
      },
      { title: `${params.profileId || "Account details"} | Holidaze` },
    ],
  }),
  component: ProfileById,
  pendingComponent: SkeletonAccount,
  notFoundComponent: DefaultNotFound,
  errorComponent: CustomError,
});

function ProfileById() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeTab, setActiveTab] = useState<DirectoryKey>("account");
  const { profileId } = Route.useParams();
  const { data: accountResult } = useSuspenseQuery(profileByIdQuery(profileId));
  const hasVenueManagerRole = accountResult.data.venueManager;

  const { data: venuesResult } = useQuery({
    ...venuesByProfileQuery(profileId),
    enabled: hasVenueManagerRole,
  });

  const venueInfo = venuesResult?.data ?? [];
  const user: Profile = {
    ...accountResult.data,
    venues: venuesResult?.data ?? accountResult.data.venues,
  };

  const visibleTabs = Object.entries(availableDirectories).filter(
    ([key]) => hasVenueManagerRole || key === "account" || key === "myTrips",
  ) as [DirectoryKey, string][];

  return (
    <>
      <Container id="profile-details" sx={{ py: 16 }}>
        <AccountHero user={user} />

        {/* Render select menu on mobile, otherwise render tabs */}
        <Stack id="profile-tabs" sx={{ mt: 2, spaceBetween: 1 }}>
          {isMobile ? (
            <Select
              fullWidth
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              inputProps={{ "aria-label": "Select section" }}
              sx={{ mb: 2 }}
            >
              {visibleTabs.map(([key, label]) => (
                <MenuItem key={key} value={key}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          ) : (
            <Tabs
              variant="scrollable"
              value={activeTab}
              onChange={(_, newTab: DirectoryKey) => setActiveTab(newTab)}
            >
              {visibleTabs.map(([key, label]) => (
                <Tab key={key} value={key} label={label} />
              ))}
            </Tabs>
          )}

          <Stack
            sx={{
              p: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
              mb: 2,
            }}
          >
            {activeTab === "account" && (
              <AccountInfo user={user} isManager={hasVenueManagerRole} />
            )}

            {activeTab === "myTrips" && (
              <Suspense fallback={<RouteLoader />}>
                <MyTripsInfo />
              </Suspense>
            )}

            {activeTab === "venues" && hasVenueManagerRole && (
              <Suspense fallback={<RouteLoader />}>
                <VenueInfo venueInfo={venueInfo} />
              </Suspense>
            )}

            {activeTab === "bookings" && hasVenueManagerRole && (
              <Suspense fallback={<RouteLoader />}>
                <BookingsInfo venueInfo={venueInfo} />
              </Suspense>
            )}

            {activeTab === "calendar" && hasVenueManagerRole && (
              <i>Feature coming soon...</i>
            )}

            {activeTab === "metrics" && hasVenueManagerRole && <MetricsInfo />}
          </Stack>
        </Stack>
      </Container>
      <Divider />
    </>
  );
}
