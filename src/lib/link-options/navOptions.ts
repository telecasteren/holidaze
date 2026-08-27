import { linkOptions } from "@tanstack/react-router";

export const navOptions = () => [
  {
    link: linkOptions({
      to: "/venues",
      activeOptions: { exact: true },
    }),
    label: "Venues",
    icon: false,
  },
  {
    link: linkOptions({
      to: "/booking",
      activeOptions: { exact: true },
    }),
    label: "Booking",
    icon: false,
  },
  {
    link: linkOptions({
      to: "/journal",
      activeOptions: { exact: true },
    }),
    label: "Journal",
    icon: false,
  },
  {
    link: linkOptions({
      to: "/",
      hash: "reviews",
      activeOptions: { exact: true },
    }),
    label: "Reviews",
    icon: false,
  },
];
