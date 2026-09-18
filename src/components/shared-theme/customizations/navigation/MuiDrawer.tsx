import type { Theme, Components } from "@mui/material/styles";

export const MuiDrawer: Components<Theme> = {
  MuiDrawer: {
    styleOverrides: {
      paper: ({ theme }) => ({
        backgroundColor: (theme.vars || theme).palette.background.default,
      }),
    },
  },
};
