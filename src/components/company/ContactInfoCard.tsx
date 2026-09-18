import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MailOutlineRoundedIcon from "@mui/icons-material/MailOutlineRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import {
  LinkedInIcon,
  TwitterIcon,
  InstagramIcon,
} from "@/components/layout/icons";
import { brandSettings } from "@/lib/brand/brandSettings";

const contactDetails = [
  { icon: <MailOutlineRoundedIcon />, label: brandSettings.email },
  { icon: <LocalPhoneRoundedIcon />, label: brandSettings.phone },
  {
    icon: <LocationOnRoundedIcon />,
    label: `${brandSettings.address}, ${brandSettings.postalCode} ${brandSettings.city}, ${brandSettings.country}`,
  },
  { icon: <AccessTimeRoundedIcon />, label: brandSettings.phoneHours },
];

export function ContactInfoCard() {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent
        sx={{
          p: { xs: 2, sm: 3 },
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Typography component="h2" variant="h6" sx={{ color: "text.primary" }}>
          Contact information
        </Typography>

        <Stack spacing={2}>
          {contactDetails.map((detail, index) => (
            <Stack
              key={index}
              direction="row"
              spacing={1.5}
              sx={{ alignItems: "flex-start" }}
            >
              <Box sx={{ color: "primary.main", display: "flex" }}>
                {detail.icon}
              </Box>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {detail.label}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack
          direction="row"
          spacing={1}
          useFlexGap
          sx={{ color: "text.secondary" }}
        >
          <IconButton
            color="inherit"
            size="small"
            href="#"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" size="small" href="#" aria-label="X">
            <TwitterIcon />
          </IconButton>
          <IconButton
            color="inherit"
            size="small"
            href="#"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}
