import { linkOptions } from "@tanstack/react-router";

export const footerOptions = [
  {
    link: linkOptions({ to: "/", hash: "#services" }),
    label: "Services",
    icon: false,
  },
  {
    link: linkOptions({ to: "/", hash: "#reviews" }),
    label: "Reviews",
    icon: false,
  },
  {
    link: linkOptions({ to: "/", hash: "#faqs" }),
    label: "FAQs",
    icon: false,
  },
  {
    link: linkOptions({ to: "/company/about" }),
    label: "About",
    icon: false,
  },
  {
    link: linkOptions({ to: "/company/careers" }),
    label: "Careers",
    icon: false,
  },
  {
    link: linkOptions({ to: "/company/contact" }),
    label: "Contact",
    icon: false,
  },
  {
    link: linkOptions({ to: "/legal/terms" }),
    label: "Terms",
    icon: false,
  },
  {
    link: linkOptions({ to: "/legal/privacy" }),
    label: "Privacy",
    icon: false,
  },
]
