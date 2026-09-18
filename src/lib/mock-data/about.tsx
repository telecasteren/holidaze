import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import VerifiedUserRoundedIcon from "@mui/icons-material/VerifiedUserRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";

export interface CompanyValue {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const values: Array<CompanyValue> = [
  {
    icon: <PublicRoundedIcon />,
    title: "Global reach",
    description:
      "From city guesthouses to countryside cabins, we connect travellers with venues across the globe.",
  },
  {
    icon: <GroupsRoundedIcon />,
    title: "Community first",
    description:
      "We build tools that help venue managers grow their business and help guests find a place that feels right.",
  },
  {
    icon: <VerifiedUserRoundedIcon />,
    title: "Trust & safety",
    description:
      "Every listing and booking runs through the same standards, so you know what to expect before you arrive.",
  },
  {
    icon: <FavoriteRoundedIcon />,
    title: "Loved by travellers",
    description:
      "Thousands of stays booked and reviewed by a community that keeps coming back for their next trip.",
  },
];

export interface CompanyStat {
  value: string;
  label: string;
}

export const stats: Array<CompanyStat> = [
  { value: "10K+", label: "Venues listed" },
  { value: "120+", label: "Countries covered" },
  { value: "500K+", label: "Bookings made" },
  { value: "4.8/5", label: "Average guest rating" },
];
