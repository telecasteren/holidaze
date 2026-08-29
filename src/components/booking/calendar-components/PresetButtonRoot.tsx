import { styled } from "@mui/material";

export const PresetButtonRoot = styled("button", {
    shouldForwardProp: (prop) => prop !== "isSelected",
})<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
    cursor: "pointer",
    appearance: "none",
    border: "none",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1, 1.5),
    textAlign: "left",
    fontFamily: "inherit",
    fontSize: "0.875rem",
    fontWeight: 500,
    transition: theme.transitions.create(["background-color", "color"], {
        duration: 100,
        easing: "linear",
    }),
    backgroundColor: isSelected ? theme.palette.action.selected : "transparent",
    color: isSelected ? theme.palette.text.primary : theme.palette.text.secondary,
    "&:hover": {
        backgroundColor: isSelected ? theme.palette.action.selected : theme.palette.action.hover,
        color: theme.palette.text.primary,
    },
    "&:focus-visible": {
        outline: `2px solid ${theme.palette.primary.main}`,
        outlineOffset: 2,
    },
}));
