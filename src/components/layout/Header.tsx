import * as React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Link } from '@tanstack/react-router';
import { navOptions } from "@/lib/link-options/navOptions"
import { stringAvatar } from '@/lib/stringAvatar';
import { toast } from 'react-hot-toast';

import {
  styled, alpha,
  MenuList,
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Container,
  Divider,
  MenuItem,
  Avatar
} from '@mui/material';

import ColorModeIconDropdown from '../shared-theme/ColorModeIconDropdown';
import { BrandLogo } from '@/components/layout/BrandLogo';
import { MenuIcon, CloseRoundedIcon, LogoutIcon } from './icons';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: 'blur(24px)',
  border: '1px solid',
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: '8px 12px',
}));

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const {isAuthenticated, user, logout} = useAuth();
  const avatarProps = stringAvatar(user?.name ?? "John Doe");

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    toast.success("Logging out...");
    setTimeout(() => {
      logout();
    }, 1500);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 'calc(var(--template-frame-height, 0px) + 28px)',
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
             <BrandLogo />
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              {navOptions().map((item) => {
                return (
                  <Link
                    {...item.link}
                    key={item.label}
                  >
                      <Button variant="text" color="info" size="small" sx={{ minWidth: 0 }}>
                      {item.label}
                        </Button>
                    </Link>
                  )
              })}
            </Box>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {!isAuthenticated ? (
              <>
            <Button type="link" color="primary" variant="text" size="small"
             href="/auth/login">
             Sign in
           </Button>
           <Button type="link" color="primary" variant="contained" size="small"
             href="/auth/signup">
             Sign up
                </Button>
              </>
            )
            :
              (
              <>
              <Link
                to="/account/$profileId"
                params={{ profileId: "tele_user1" }}
                style={{ textDecoration: 'none' }}
              >
                <Avatar key="user.name here" {...avatarProps} sx={{ ...avatarProps.sx, width: 30, height: 30 }} />
              </Link>
              <Button size="small"
                onClick={() => handleLogout()}>
                <LogoutIcon />
              </Button>
              </>
            )}
            <ColorModeIconDropdown />
          </Box>

          {/* Mobile menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
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
                    top: 'var(--template-frame-height, 0px)',
                  },
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>
                <MenuList sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {navOptions().map((item) => {
                    return (
                    <Link
                      {...item.link}
                        key={item.label}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <MenuItem>{item.label}</MenuItem>
                    </Link>
                    )
                  })}
                </MenuList>
                <Divider sx={{ my: 3 }} />
                <Button type="link" color="primary" variant="contained" fullWidth
                  href="/auth/signup">
                  Sign up
                </Button>
                <Button type="link" color="primary" variant="outlined" fullWidth
                  href="/auth/login">
                  Sign in
                </Button>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
