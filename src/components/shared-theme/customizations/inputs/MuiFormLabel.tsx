import type { Theme, Components } from "@mui/material/styles";

export const MuiFormLabel: Components<Theme> = {
  MuiFormLabel: {
    styleOverrides: {
      root: ({ theme }) => ({
        typography: theme.typography.caption,
        marginBottom: 8,
      }),
    },
  },
};
