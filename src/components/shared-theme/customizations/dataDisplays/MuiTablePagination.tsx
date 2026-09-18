import type { Theme, Components } from "@mui/material/styles";
import { iconButtonClasses } from "@mui/material/IconButton";

export const MuiTablePagination: Components<Theme> = {
  MuiTablePagination: {
    styleOverrides: {
      actions: {
        display: "flex",
        gap: 8,
        marginRight: 6,
        [`& .${iconButtonClasses.root}`]: {
          minWidth: 0,
          width: 36,
          height: 36,
        },
      },
    },
  },
};
