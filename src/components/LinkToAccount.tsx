import { Link } from '@tanstack/react-router';

interface LinkToAccountProps {
  profileId: string;
  children?: string | React.ReactNode;
  styles?: React.CSSProperties;
  icon?: React.ReactNode;
}

export const LinkToAccount = ({ profileId, children, styles, icon }: LinkToAccountProps) => {
  return (
    <Link
      className="link-underline"
      to="/account/$profileId"
      params={{ profileId: profileId }}
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
