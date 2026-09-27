import { Box, Link as MuiLink, styled } from "@mui/material";
import { ArrowForwardIcon } from "../../layout/icons";
import { Link as RouterLink } from "@tanstack/react-router";
import { LinkToAccount } from "../../LinkToAccount";

const StyledBox = styled(Box)(() => ({
  display: "grid",
  justifyContent: "center",
  borderRadius: 8,
  padding: 8,
}));

const linkSx = {
  padding: 1.5,
  width: "fit-content",
  textDecoration: "none",
  color: "text.light",
  display: "flex",
  alignItems: "center",
  fontSize: { xs: 20, sm: 22 },
  fontFamily: "Century Gothic",
  borderRadius: 1.5,
  backgroundColor: "primary.dark",
  "&:hover": {
    textDecoration: "underline",
  },
};

interface HeroCtaProps {
  isAuthenticated: boolean;
  isVenueManager: boolean | undefined;
  userName: string | undefined;
}

export const HeroCta = ({
  isAuthenticated,
  isVenueManager,
  userName,
}: HeroCtaProps) => {
  if (!isAuthenticated) {
    return (
      <StyledBox sx={{ color: "text.light" }}>
        <MuiLink component={RouterLink} to="/auth/signup" sx={linkSx}>
          Sign up now <ArrowForwardIcon />
        </MuiLink>
      </StyledBox>
    );
  }

  if (isVenueManager) {
    return (
      <Box sx={linkSx}>
        <LinkToAccount profileId={userName || ""}>
          Register a venue now <ArrowForwardIcon />
        </LinkToAccount>
      </Box>
    );
  }

  return (
    <Box sx={linkSx}>
      <LinkToAccount profileId={userName || ""}>
        Become a venue manager today <ArrowForwardIcon />
      </LinkToAccount>
    </Box>
  );
};
