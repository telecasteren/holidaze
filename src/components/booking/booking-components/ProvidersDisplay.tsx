import Box from "@mui/material/Box";

export const providerDetails = [
  {
    Card: {
      src: "/payment-logos/visa.png",
      alt: "Visa logo",
    },
  },
  {
    Klarna: {
      src: "/payment-logos/klarna.png",
      alt: "Klarna logo",
    },
  },
  {
    Vipps: {
      src: "/payment-logos/vipps.png",
      alt: "Vipps logo",
    },
  },
];

export const ProvidersDisplay = () => {
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
