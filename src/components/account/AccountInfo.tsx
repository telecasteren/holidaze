import { useState } from "react";
import type { Profile } from "@/lib/zod/index";
import { getAvgRating } from "@/lib/utils/getAvgRating";
import { Box, Typography, Button, Divider } from "@mui/material";
import { ModalWindow } from "@/components/layout/Modal";
import { VenueManagerForm } from "@/components/account/components/VenueManagerForm";

interface AccountInfoProps {
  user: Profile;
  isManager: boolean;
}

export const AccountInfo = ({ user, isManager }: AccountInfoProps) => {
  const [open, setOpen] = useState(false);
  const { averageRating } = getAvgRating(user);

  const openModal = () => {
    setOpen(true);
  };
  return (
    <Box>
      <Box sx={{ display: "grid", gap: 1 }}>
        <Typography
          component="span"
          sx={{ fontWeight: "bold", color: "text.secondary" }}
        >
          Account
        </Typography>
        <Box>
          <Typography variant="body1">
            <strong>Username:</strong> {user.name}
          </Typography>
          <Typography variant="body2">
            <strong>Email address:</strong> {user.email}
          </Typography>
        </Box>

        <Divider />

        <Typography
          component="span"
          sx={{ fontWeight: "bold", color: "text.secondary" }}
        >
          Hosting
        </Typography>
        <Box>
          <Typography variant="body2">
            <strong>Venue manager:</strong> {isManager ? "Yes" : "No"}
          </Typography>
          <Typography variant="body2">
            <strong>Average rating:</strong> {averageRating ?? "—"}
          </Typography>
        </Box>
      </Box>

      {!isManager && (
        <Button variant="outlined" sx={{ mt: 2 }} onClick={openModal}>
          Register as venue manager
        </Button>
      )}

      <ModalWindow
        open={open}
        onClose={() => setOpen(false)}
        title="Register as venue manager"
        text=""
        content={<VenueManagerForm />}
      />
    </Box>
  );
};
