import { Box, Link, Typography } from "@mui/material";

export const AcceptTerms = () => {
  return (
    <Box>
      <Typography variant="caption">
        By continuing you agree to{" "}
        <Link href="/company/terms">Holidaze terms and conditions</Link>
      </Typography>
    </Box>
  );
};
