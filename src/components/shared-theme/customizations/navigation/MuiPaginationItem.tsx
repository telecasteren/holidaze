import type { Theme, Components } from "@mui/material/styles";

export const MuiPaginationItem: Components<Theme> = {
  MuiPaginationItem: {
    styleOverrides: {
      root: ({ theme }) => ({
        "&.Mui-selected": {
          color: "white",
          backgroundColor: (theme.vars || theme).palette.grey[900],
        },
        ...theme.applyStyles("dark", {
          "&.Mui-selected": {
            color: "black",
            backgroundColor: (theme.vars || theme).palette.grey[50],
          },
        }),
      }),
    },
  },
};
