import { useState } from "react";
import { useNavUser } from "@/hooks/useNavUser";
import { Link } from "@tanstack/react-router";
import { navOptions } from "@/lib/link-options/navOptions";

import {
  MenuList,
  Box,
  Drawer,
  Button,
  IconButton,
  Divider,
  MenuItem,
  Avatar,
} from "@mui/material";

import ColorModeIconDropdown from "@/components/shared-theme/ColorModeIconDropdown";
import {
  MenuIcon,
  CloseRoundedIcon,
  LogoutIcon,
} from "@/components/layout/icons";
import { LinkToAccount } from "@/components/LinkToAccount";

export const MobileMenu = () => {
  const { isAuthenticated, userName, avatarProps, handleLogout } = useNavUser();
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
      <ColorModeIconDropdown size="medium" />
      <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="top"
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              top: "var(--template-frame-height, 0px)",
            },
          },
        }}
      >
        <Box sx={{ p: 2, backgroundColor: "background.default" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={toggleDrawer(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          <MenuList sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {navOptions().map((item) => {
              return (
                <Link
                  {...item.link}
                  key={item.label}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem>{item.label}</MenuItem>
                </Link>
              );
            })}
          </MenuList>
          <Divider sx={{ my: 3 }} />

          {!isAuthenticated ? (
            // Show sign in/sign up buttons if not authenticated
            <>
              <Button
                type="link"
                color="primary"
                variant="text"
                size="small"
                href="/auth/login"
              >
                Sign in
              </Button>
              <Button
                type="link"
                color="primary"
                variant="contained"
                size="small"
                href="/auth/signup"
              >
                Sign up
              </Button>
            </>
          ) : (
            // Show Avatar and logout button if authenticated
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <LinkToAccount profileId={userName} unstyled>
                <Avatar
                  key={userName}
                  {...avatarProps}
                  sx={{ ...avatarProps.sx, width: 30, height: 30 }}
                />
              </LinkToAccount>
              <Button
                size="small"
                aria-label="Logout button"
                onClick={() => handleLogout()}
              >
                <LogoutIcon />
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};
