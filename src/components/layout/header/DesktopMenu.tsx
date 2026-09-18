import { useNavUser } from "@/hooks/useNavUser";
import { Link } from "@tanstack/react-router";
import { navOptions } from "@/lib/link-options/navOptions";

import { Box, Button, Avatar, Typography } from "@mui/material";
import ColorModeIconDropdown from "@/components/shared-theme/ColorModeIconDropdown";

import { BrandLogo } from "@/components/layout/BrandLogo";
import { LogoutIcon } from "@/components/layout/icons";
import { LinkToAccount } from "@/components/LinkToAccount";
import { TooltipWithContent } from "@/components/layout/Tooltips";

export const DesktopMenu = () => {
  const { isAuthenticated, userName, avatarProps, handleLogout } = useNavUser();

  return (
    <>
      <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}>
        <BrandLogo />
        <Box
          sx={{ display: { xs: "none", md: "flex" } }}
          component="nav"
          aria-label="main menu navigation"
        >
          {navOptions().map((item) => {
            return (
              <Button
                key={item.label}
                component={Link}
                {...item.link}
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0, fontSize: "1rem" }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: 1,
          alignItems: "center",
        }}
      >
        {!isAuthenticated ? (
          <>
            <Button
              color="primary"
              variant="text"
              size="small"
              href="/auth/login"
            >
              Sign in
            </Button>
            <Button
              color="primary"
              variant="contained"
              size="small"
              href="/auth/signup"
            >
              Sign up
            </Button>
          </>
        ) : (
          <>
            <TooltipWithContent
              trigger={
                <LinkToAccount profileId={userName} unstyled>
                  <Avatar
                    key={userName}
                    {...avatarProps}
                    sx={{ ...avatarProps.sx, width: 30, height: 30 }}
                  />
                </LinkToAccount>
              }
            >
              <Typography variant="body1">Go to your account</Typography>
            </TooltipWithContent>

            <TooltipWithContent
              trigger={
                <Button
                  size="small"
                  aria-label="Logout button"
                  onClick={() => handleLogout()}
                >
                  <LogoutIcon />
                </Button>
              }
            >
              <Typography variant="body1">Log out</Typography>
            </TooltipWithContent>
          </>
        )}
        <ColorModeIconDropdown />
      </Box>
    </>
  );
};
