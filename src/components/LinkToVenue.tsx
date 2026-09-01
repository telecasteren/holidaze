import { Link } from '@tanstack/react-router';
import { ArrowForwardIcon } from "@/components/layout/icons";

interface LinkToVenueProps {
  venueId: string;
  children?: string | React.ReactNode;
  styles?: React.CSSProperties;
}

export const LinkToVenue = ({venueId, children, styles}: LinkToVenueProps) => {
  return (
  <Link
    to="/venues/$venueId"
    params={{ venueId: venueId }}
      style={{
        textDecoration: "none",
        color: "black",
        display: "flex",
        alignItems: "center",
        marginTop: 1,
        ...styles,
      }}
    >
    {children}{" "}<ArrowForwardIcon />
  </Link>
  )
}
