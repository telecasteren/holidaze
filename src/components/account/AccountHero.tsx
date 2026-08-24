import { PageTitle } from '@/components/index';
import { Box, Avatar } from '@mui/material';

type AccountHeroProps = {
  user: {
    name: string;
    avatar: {
      url: string;
      alt: string;
    };
    banner: {
      url: string;
      alt: string;
    };
  };
};

export const AccountHero = ({ user }: AccountHeroProps) => {
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
        }}
      >
      <PageTitle title={`Welcome, ${user.name}`} />
      <Avatar
        src={user.avatar.url}
        alt={user.avatar.alt}
        sx={{ width: 150, height: 150 }}
        />
      </Box>

      <img
        src={user.banner.url}
        alt={user.banner.alt}
        style={{ width: "100%", height: "200px", borderRadius: '0.2rem' }}
      />
    </Box>
  );
};
