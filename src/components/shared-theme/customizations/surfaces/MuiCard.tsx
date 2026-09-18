import { alpha } from "@mui/material/styles";
import type { Theme, Components } from "@mui/material/styles";
import { gray } from "@/components/shared-theme/themePrimitives";

export const MuiCard: Components<Theme> = {
  MuiCard: {
    styleOverrides: {
      root: ({ theme }) => {
        return {
          padding: 16,
          gap: 16,
          transition: "all 100ms ease",
          backgroundColor: gray[50],
          borderRadius: (theme.vars || theme).shape.borderRadius,
          border: `1px solid ${(theme.vars || theme).palette.divider}`,
          boxShadow: "none",
          ...theme.applyStyles("dark", {
            backgroundColor: "hsla(220, 35%, 3%, 0.4)",
          }),
          variants: [
            {
              props: {
                variant: "outlined",
              },
              style: {
                border: `1px solid ${(theme.vars || theme).palette.divider}`,
                boxShadow: "none",
                background: "hsl(0, 0%, 100%)",
                ...theme.applyStyles("dark", {
                  background: alpha(gray[900], 0.4),
                }),
              },
            },
          ],
        };
      },
    },
  },
  MuiCardContent: {
    styleOverrides: {
      root: {
        padding: 0,
        "&:last-child": { paddingBottom: 0 },
      },
    },
  },
  MuiCardHeader: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
  MuiCardActions: {
    styleOverrides: {
      root: {
        padding: 0,
      },
    },
  },
};
