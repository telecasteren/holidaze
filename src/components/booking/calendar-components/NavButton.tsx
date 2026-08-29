import { styled } from "@mui/material";
import { Button as AriaButton } from "react-aria-components";

export const NavButton = styled(AriaButton)(({ theme }) => ({
  display: "inline-flex",
  width: 32,
  height: 32,
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
  border: "none",
  outline: "none",
  borderRadius: "50%",
  backgroundColor: "transparent",
  color: theme.palette.text.secondary,
  cursor: "pointer",
  transition: theme.transitions.create(["background-color", "color"], {
    duration: 100,
    easing: "linear",
  }),

  "& svg": {
    fontSize: 20,
  },
  "&[data-hovered]": {
    backgroundColor: theme.palette.action.hover,
    color: theme.palette.text.primary,
  },
  "&[data-focus-visible]": {
    outline: `2px solid ${theme.palette.primary.main}`,
    outlineOffset: 2,
  },
  "&[data-disabled]": {
    opacity: 0.5,
    cursor: "not-allowed",
  }
}));
