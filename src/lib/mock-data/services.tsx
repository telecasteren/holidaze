import {
  ViewQuiltRoundedIcon,
  CalendarMonthIcon,
  DevicesRoundedIcon,
} from "@/components/layout/icons";

export const serviceItems = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: "Metrics",
    description:
      "Coming soon for venue managers! Your very own metrics dashboard. See your current and expected earnings and more.",
    imageLight: `url("/services/BarLineChart-light.webp")`,
    imageDark: `url("/services/BarLineChart-dark.webp")`,
  },
  {
    icon: <CalendarMonthIcon />,
    title: "Calendar",
    description:
      "Get your planning done with Holidazes intuitive and easy calendar and booking system.",
    imageLight: `url("/services/mobile_calendar-light.png")`,
    imageDark: `url("/services/mobile_calendar-dark.png")`,
  },
  {
    icon: <DevicesRoundedIcon />,
    title: "Available on all platforms",
    description:
      "Holidaze is just as easy to use on desktop as on mobile devices. This rich and responsive web application will follow you where you need.",
    imageLight: `url("/services/mobile_screens-light.webp")`,
    imageDark: `url("/services/mobile_screens-dark.webp")`,
  },
];
