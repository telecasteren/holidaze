import Box from "@mui/material/Box";

export const providerDetails = [
  {
    Card: {
      src: "/payment-logos/visa.png",
      alt: "Visa logo",
      title: "Card details:",
    },
  },
  {
    Klarna: {
      src: "/payment-logos/klarna.png",
      alt: "Klarna logo",
      title: "Klarna details:",
    },
  },
  {
    Vipps: {
      src: "/payment-logos/vipps.png",
      alt: "Vipps logo",
      title: "Vipps details:",
    },
  },
];

export const ProviderLogoDisplay = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gridTemplateColumns: "4fr",
        gap: 2,
      }}
    >
      {providerDetails.map((provider) => {
        for (const [key, value] of Object.entries(provider)) {
          return (
            <Box
              key={key}
              component="img"
              src={value.src}
              alt={value.alt}
              sx={{
                width: 60,
                height: 20,
              }}
            />
          );
        }
      })}
    </Box>
  );
};
