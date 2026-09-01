import { Link } from '@tanstack/react-router';

interface LinkToAccountProps {
  profileId: string;
  children?: string | React.ReactNode;
  styles?: React.CSSProperties;
}

export const LinkToAccount = ({profileId, children, styles}: LinkToAccountProps) => {
  return (
  <Link
    to="/account/$profileId"
    params={{ profileId: profileId }}
    style={{ textDecoration: "none", ...styles }}
    >
    {children}
  </Link>
  )
}
