import type { Theme, Components } from "@mui/material/styles";
import { gray } from "@/components/shared-theme/themePrimitives";

export const MuiStep: Components<Theme> = {
  MuiStepConnector: {
    styleOverrides: {
      line: ({ theme }) => ({
        borderTop: "1px solid",
        borderColor: (theme.vars || theme).palette.divider,
        flex: 1,
        borderRadius: "99px",
      }),
    },
  },
  MuiStepIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: "transparent",
        border: `1px solid ${gray[400]}`,
        width: 12,
        height: 12,
        borderRadius: "50%",
        "& text": {
          display: "none",
        },
        "&.Mui-active": {
          border: "none",
          color: (theme.vars || theme).palette.primary.main,
        },
        "&.Mui-completed": {
          border: "none",
          color: (theme.vars || theme).palette.success.main,
        },
        ...theme.applyStyles("dark", {
          border: `1px solid ${gray[700]}`,
          "&.Mui-active": {
            border: "none",
            color: (theme.vars || theme).palette.primary.light,
          },
          "&.Mui-completed": {
            border: "none",
            color: (theme.vars || theme).palette.success.light,
          },
        }),
        variants: [
          {
            props: { completed: true },
            style: {
              width: 12,
              height: 12,
            },
          },
        ],
      }),
    },
  },
  MuiStepLabel: {
    styleOverrides: {
      label: ({ theme }) => ({
        "&.Mui-completed": {
          opacity: 0.6,
          ...theme.applyStyles("dark", { opacity: 0.5 }),
        },
      }),
    },
  },
};
