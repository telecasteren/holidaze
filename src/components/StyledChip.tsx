import { Chip as MuiChip, styled } from "@mui/material";

/** props: selected - responsible for showing selected state or set the brand blue colour when stateless */
interface ChipProps {
  selected?: boolean;
}

export const StyledChip = styled(MuiChip)<ChipProps>(({ theme }) => ({
  variants: [
    {
      props: ({ selected }) => !!selected,
      style: {
        backgroundColor: (theme.vars || theme).palette.primary.dark,
        color: "hsl(0, 0%, 100%)",
        border: "none",
        "& .MuiChip-label": {
          color: "hsl(0, 0%, 100%)",
        },
        ":hover": {
          backgroundColor: (theme.vars || theme).palette.primary.dark,
        },
        ...theme.applyStyles("dark", {
          backgroundColor: (theme.vars || theme).palette.primary.dark,
        }),
      },
    },
  ],
}));
