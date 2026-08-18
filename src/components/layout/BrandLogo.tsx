import { brandSettings } from '@/lib/brand/brandSettings';

export default function BrandLogo() {
  return (
    <img src={brandSettings.logo} alt={`Brand logo for ${brandSettings.name}`}/>
  );
}
