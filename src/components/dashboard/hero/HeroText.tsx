import { Typography } from "@mui/material";
import HeroTitle from "@/components/layout/HeroTitle";
import { heroText } from "./texts";
import type { Role } from "./texts";

interface HeroTextProps {
  isAuthenticated: boolean;
  isVenueManager: boolean | undefined;
}

export const HeroText = ({
  isAuthenticated,
  isVenueManager,
}: HeroTextProps) => {
  const role: Role = !isAuthenticated
    ? "guest"
    : isVenueManager
      ? "manager"
      : "customer";
  const { title, span, caption } = heroText[role];

  return (
    <>
      <HeroTitle title={title} span={span} />{" "}
      <Typography
        sx={{
          textAlign: "center",
          color: "text.light",
          width: { sm: "100%", md: "80%" },
          borderRadius: 1,
        }}
      >
        {caption}
      </Typography>
    </>
  );
};
