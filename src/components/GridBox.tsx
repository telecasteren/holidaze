import Box from "@mui/material/Box";

interface GridBoxProps {
  id?: string;
  ariaLabel?: string | "Grid layout box";
  styles?: React.CSSProperties;
  children: React.ReactNode;
}

export const GridBox = ({id, ariaLabel, children, styles}: GridBoxProps) => {
  return (
    <Box
      id={id}
      aria-label={ariaLabel}
      sx={{ display: "grid", ...styles }}
    >
      {children}
    </Box>
  )
}
