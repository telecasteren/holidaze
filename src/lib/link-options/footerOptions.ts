import { linkOptions } from "@tanstack/react-router";

export const footerOptions = () => [
  {
    group: "Product",
    links: [
      {
        label: "Services",
        link: linkOptions({
          to: "/",
          hash: "services",
        }),
      },
      {
        label: "Reviews",
        link: linkOptions({
          to: "/",
          hash: "reviews",
        }),
      },
      {
        label: "FAQs",
        link: linkOptions({
          to: "/",
          hash: "faqs",
        }),
      },
    ],
  },
  {
    group: "Company",
    links: [
      {
        label: "About",
        link: linkOptions({
          to: "/company/about",
        }),
      },
      {
        label: "Careers",
        link: linkOptions({
          to: "/company/careers",
        }),
      },
      {
        label: "Contact",
        link: linkOptions({
          to: "/company/contact",
        }),
      },
    ],
  },
  {
    group: "Legal",
    links: [
      {
        label: "Terms",
        link: linkOptions({ to: "/legal/terms" }),
      },
      {
        label: "Privacy",
        link: linkOptions({
          to: "/legal/privacy",
        }),
      },
    ],
  },
];
