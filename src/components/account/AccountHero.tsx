import { PageTitle } from '@/components/index';
import { Box } from '@mui/material';
import { AvatarDisplay } from '@/components/account/components/AvatarDisplay';
import type { Profile } from "@/lib/zod/index"

export const AccountHero = ({ user }: {user: Profile}) => {
  return (
    <Box id="profile-header" sx={{ mt: 2, position: 'relative' }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 6,
          xs: { px: 2 }
        }}
      >
        <PageTitle title={`Welcome, ${user.name}`} />
        <AvatarDisplay user={user} />
      </Box>

      <img
        src={user.banner.url}
        alt={user.banner.alt}
        style={{ width: "100%", height: "200px", borderRadius: '0.2rem' }}
      />
    </Box>
  );
};
