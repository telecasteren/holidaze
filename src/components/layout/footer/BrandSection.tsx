import {
  Box,
  Stack,
  Typography,
  InputLabel,
  TextField,
  Button,
} from "@mui/material";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { toast } from "react-hot-toast";

export const BrandSection = () => {
  const handleSubscribe = () => {
    toast.remove();
    toast.success("Subscribed! Great content heading your way.");
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        minWidth: { xs: "100%", sm: "60%" },
      }}
    >
      <Box sx={{ width: { xs: "100%", sm: "60%" } }}>
        <Box sx={{ maxWidth: 250, height: "auto" }}>
          <BrandLogo />
        </Box>
        <Typography
          variant="body2"
          gutterBottom
          sx={{ fontWeight: 600, mt: 2 }}
        >
          Join the newsletter
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
          Subscribe for the best offers and venue updates.
        </Typography>
        <InputLabel htmlFor="email-newsletter">Email</InputLabel>
        <Stack direction="row" spacing={1} useFlexGap>
          <TextField
            id="email-newsletter"
            hiddenLabel
            size="small"
            variant="outlined"
            fullWidth
            placeholder="Your email address"
            slotProps={{
              htmlInput: {
                autoComplete: "off",
                "aria-label": "Enter your email address",
              },
            }}
            sx={{ width: "250px" }}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ flexShrink: 0 }}
            onClick={handleSubscribe}
          >
            Subscribe
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};
