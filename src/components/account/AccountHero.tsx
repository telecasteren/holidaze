import type { Profile } from "@/lib/zod/index";
import { getAvgRating } from "@/lib/utils/getAvgRating";
import { Box, Chip, Typography } from "@mui/material";
import { PageTitle } from "@/components/layout/index";
import { AvatarDisplay } from "@/components/account/components/AvatarDisplay";

export const AccountHero = ({ user }: { user: Profile }) => {
  const isVenueManager = user.venueManager;
  const { averageRating } = getAvgRating(user);

  return (
    <Box id="profile-header" sx={{ mt: 2, position: "relative" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, md: 6 },
        }}
      >
        <Box sx={{ display: "grid", gap: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <PageTitle title={user.name} />
            {isVenueManager && (
              <Chip
                key={user.name}
                label="Venue manager"
                color="primary"
                sx={{
                  border: "none",
                  width: "fit-content",
                }}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box component="span" sx={{ fontSize: 16, fontWeight: "bold" }}>
                {user._count.venues}{" "}
              </Box>
              <Typography variant="body1" component="span">
                venues managed
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box component="span" sx={{ fontSize: 16, fontWeight: "bold" }}>
                {averageRating ?? "—"}{" "}
              </Box>
              <Typography variant="body1" component="span">
                Average rating
              </Typography>
            </Box>
          </Box>
        </Box>
        <AvatarDisplay user={user} />
      </Box>

      <Box
        component="img"
        src={user.banner.url}
        alt={user.banner.alt || `Account banner for ${user.name}`}
        sx={{
          width: "100%",
          height: { xs: 120, md: 200 },
          borderRadius: "0.2rem",
        }}
      />
    </Box>
  );
};
