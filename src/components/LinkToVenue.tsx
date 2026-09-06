import { Link } from '@tanstack/react-router';

interface LinkToVenueProps {
  unstyled?: boolean;
  venueId: string;
  children?: string | React.ReactNode;
  styles?: React.CSSProperties;
  icon?: React.ReactNode;
}

export const LinkToVenue = ({ unstyled, venueId, children, styles, icon }: LinkToVenueProps) => {
  if (!venueId) return;
  return (
    <Link
      aria-label="Link to venue details"
      className={unstyled ? "" : "link-underline"}
      to="/venues/$venueId"
      params={{ venueId: venueId }}
      style={{
        width: "fit-content",
        textDecoration: "none",
        color: "inherit",
        display: "flex",
        alignItems: "center",
        marginTop: 1,
        ...styles,
      }}
    >
      {children}{" "} {icon}
  </Link>
  )
}
