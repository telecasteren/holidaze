import { Stack, Box } from "@mui/material";

export const providerDetails = [
  {
    name: "Card",
    src: "/payment-logos/visa.png",
    alt: "Visa logo",
    title: "Card details:",
    description: "",
  },

  {
    name: "Klarna",
    src: "/payment-logos/klarna.png",
    alt: "Klarna logo",
    title: "Klarna details:",
    description: "Pay with invoice with Klarna Payment.",
  },

  {
    name: "Vipps",
    src: "/payment-logos/vipps.png",
    alt: "Vipps logo",
    title: "Vipps details:",
    description: "Fastest checkout with Vipps.",
  },
];

export const ProviderLogoDisplay = () => {
  return (
    <Stack
      direction="row"
      sx={{
        gap: 2,
        maxWidth: 50,
        maxHeight: 50,
      }}
    >
      {providerDetails.map((provider) => {
        return (
          <Box
            key={provider.name}
            component="img"
            loading="lazy"
            src={provider.src}
            alt={provider.alt}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        );
      })}
    </Stack>
  );
};
