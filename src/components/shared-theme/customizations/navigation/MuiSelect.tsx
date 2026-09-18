import * as React from "react";
import { alpha } from "@mui/material/styles";
import type { Theme, Components } from "@mui/material/styles";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { selectClasses } from "@mui/material/Select";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import { gray } from "@/components/shared-theme/themePrimitives";

export const MuiSelect: Components<Theme> = {
  MuiSelect: {
    defaultProps: {
      IconComponent: React.forwardRef<SVGSVGElement, SvgIconProps>(
        (props, ref) => (
          <UnfoldMoreRoundedIcon fontSize="small" {...props} ref={ref} />
        ),
      ),
    },
    styleOverrides: {
      root: ({ theme }) => ({
        borderRadius: (theme.vars || theme).shape.borderRadius,
        border: "1px solid",
        borderColor: gray[200],
        backgroundColor: (theme.vars || theme).palette.background.paper,
        "&:hover": {
          borderColor: gray[300],
          backgroundColor: (theme.vars || theme).palette.background.paper,
        },
        [`&.${selectClasses.focused}`]: {
          outlineOffset: 0,
          borderColor: gray[400],
        },
        "&:before, &:after": {
          display: "none",
        },

        ...theme.applyStyles("dark", {
          borderRadius: (theme.vars || theme).shape.borderRadius,
          borderColor: gray[700],
          color: "white",
          backgroundColor: "hsla(220, 35%, 3%, 0.4)",
          "&:hover": {
            borderColor: alpha(gray[700], 0.7),
            backgroundColor: (theme.vars || theme).palette.background.paper,
          },
          [`&.${selectClasses.focused}`]: {
            outlineOffset: 0,
            borderColor: gray[900],
          },
          "&:before, &:after": {
            display: "none",
          },
        }),
      }),
      select: ({ theme }) => ({
        display: "flex",
        alignItems: "center",
        ...theme.applyStyles("dark", {
          display: "flex",
          alignItems: "center",
          "&:focus-visible": {
            backgroundColor: gray[900],
          },
        }),
      }),
    },
  },
};
