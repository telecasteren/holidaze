import { PageTitle } from "@/components/layout/index";
import { Box } from "@mui/material";
import { AvatarDisplay } from "@/components/account/components/AvatarDisplay";
import type { Profile } from "@/lib/zod/index";

export const AccountHero = ({ user }: { user: Profile }) => {
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
        <PageTitle title={`Welcome, ${user.name}`} />
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
