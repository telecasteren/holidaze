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
    imageLight: `url("${process.env.TEMPLATE_IMAGE_URL || "https://mui.com"}/static/images/templates/templates-images/dash-light.png")`,
    imageDark: `url("${process.env.TEMPLATE_IMAGE_URL || "https://mui.com"}/static/images/templates/templates-images/dash-dark.png")`,
  },
  {
    icon: <CalendarMonthIcon />,
    title: "Calendar",
    description:
      "Get your planning done with Holidazes intuitive and easy calendar and booking system.",
    imageLight: `url("/calendar-dates.png")`,
    imageDark: `url("/calendar-dates.png")`,
  },
  {
    icon: <DevicesRoundedIcon />,
    title: "Available on all platforms",
    description:
      "Holidaze is just as easy to use on desktop as on mobile devices. This rich and responsive web application will follow you where you need.",
    imageLight: `url("/calendar-mobile.png")`,
    imageDark: `url("/calendar-mobile.png")`,
  },
];
