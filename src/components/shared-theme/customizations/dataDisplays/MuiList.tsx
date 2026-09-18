import type { Theme, Components } from "@mui/material/styles";

export const MuiList: Components<Theme> = {
  MuiList: {
    styleOverrides: {
      root: {
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        gap: 0,
      },
    },
  },
};
