import type { Theme, Components } from "@mui/material/styles";
import { gray } from "@/components/shared-theme/themePrimitives";

export const MuiInputBase: Components<Theme> = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        border: "none",
      },
      input: {
        "&::placeholder": {
          opacity: 0.7,
          color: gray[500],
        },
      },
    },
  },
};
