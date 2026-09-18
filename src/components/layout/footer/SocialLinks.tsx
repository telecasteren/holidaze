import { Stack, IconButton } from "@mui/material";
import {
  LinkedInIcon,
  TwitterIcon,
  InstagramIcon,
} from "@/components/layout/icons";

export const SocialLinks = () => {
  return (
    <Stack
      direction="row"
      spacing={1}
      useFlexGap
      sx={{ justifyContent: "left", color: "text.secondary" }}
    >
      <IconButton
        color="inherit"
        size="small"
        href="#"
        aria-label="Instagram"
        sx={{ alignSelf: "center" }}
      >
        <InstagramIcon />
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        href="#"
        aria-label="X"
        sx={{ alignSelf: "center" }}
      >
        <TwitterIcon />
      </IconButton>
      <IconButton
        color="inherit"
        size="small"
        href="#"
        aria-label="LinkedIn"
        sx={{ alignSelf: "center" }}
      >
        <LinkedInIcon />
      </IconButton>
    </Stack>
  );
};
