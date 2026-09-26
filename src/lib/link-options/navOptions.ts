import { linkOptions } from "@tanstack/react-router";

export const navOptions = () => [
  {
    link: linkOptions({
      to: "/venues",
      activeOptions: { exact: true },
    }),
    label: "Explore",
  },
  {
    link: linkOptions({
      to: "/journal",
      activeOptions: { exact: true },
    }),
    label: "Journal",
  },
  {
    link: linkOptions({
      to: "/",
      hash: "reviews",
      activeOptions: { exact: true },
    }),
    label: "Reviews",
  },
];
