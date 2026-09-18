import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import CelebrationRoundedIcon from "@mui/icons-material/CelebrationRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";

export interface Perk {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const perks: Array<Perk> = [
  {
    icon: <HomeWorkRoundedIcon />,
    title: "Remote-friendly",
    description:
      "Work from home, our office, or wherever you do your best work.",
  },
  {
    icon: <TrendingUpRoundedIcon />,
    title: "Growth budget",
    description:
      "An annual budget for courses, conferences and the tools you need to grow.",
  },
  {
    icon: <CelebrationRoundedIcon />,
    title: "Team retreats",
    description:
      "We get together a few times a year to plan, celebrate and recharge.",
  },
  {
    icon: <ScheduleRoundedIcon />,
    title: "Flexible hours",
    description:
      "We care about the work getting done, not what time you log on.",
  },
];

export interface OpenPosition {
  title: string;
  department: string;
  location: string;
  type: string;
}

export const openPositions: Array<OpenPosition> = [
  {
    title: "Venue Success Manager",
    department: "Operations",
    location: "Oslo, Norway",
    type: "Full-time",
  },
  {
    title: "Frontend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
  },
  {
    title: "Customer Support Specialist",
    department: "Support",
    location: "Oslo, Norway",
    type: "Part-time",
  },
  {
    title: "Marketing Coordinator",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
  },
];
