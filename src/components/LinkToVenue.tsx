import { Link } from '@tanstack/react-router';

interface LinkToVenueProps {
  venueId: string;
  children?: string | React.ReactNode;
  styles?: React.CSSProperties;
  icon?: React.ReactNode;
}

export const LinkToVenue = ({ venueId, children, styles, icon }: LinkToVenueProps) => {
  return (
    <Link
      className="link-underline"
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
