import { brandSettings } from '@/lib/brand/brandSettings';
import { Link } from '@tanstack/react-router';

export default function BrandLogo() {
  return (
    <Link to="/" aria-label="Site logo and link to homepage">
      <img
        src={brandSettings.logo}
        alt={`Brand logo for ${brandSettings.name}`}
        />
    </Link>
  );
}
