import { alpha } from "@mui/material/styles";
import type { Theme, Components } from "@mui/material/styles";
import { buttonBaseClasses } from "@mui/material/ButtonBase";
import { dividerClasses } from "@mui/material/Divider";
import { gray } from "@/components/shared-theme/themePrimitives";

export const MuiMenu: Components<Theme> = {
  MuiMenu: {
    styleOverrides: {
      list: {
        gap: "0px",
        [`&.${dividerClasses.root}`]: {
          margin: "0 -8px",
        },
      },
      paper: ({ theme }) => ({
        marginTop: "4px",
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: `1px solid ${(theme.vars || theme).palette.divider}`,
        backgroundImage: "none",
        background: "hsl(0, 0%, 100%)",
        boxShadow:
          "hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px",
        [`& .${buttonBaseClasses.root}`]: {
          "&.Mui-selected": {
            backgroundColor: alpha(theme.palette.action.selected, 0.3),
          },
        },
        ...theme.applyStyles("dark", {
          background: gray[900],
          boxShadow:
            "hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px",
        }),
      }),
    },
  },
};
