import Stack from "@mui/material/Stack";

interface CardsStackProps {
  id?: string;
  ariaLabel?: string | "Cards container stack";
  styles?: React.CSSProperties;
  children: React.ReactNode;
}

export const CardsStack = ({id, ariaLabel, children, styles}: CardsStackProps) => {
  return (
    <Stack
      id={id}
      aria-label={ariaLabel}
      sx={{
        display: "grid",
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 4,
        m: 4,
        ...styles
      }}
    >
      {children}
    </Stack>
  )
}
