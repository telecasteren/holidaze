import * as React from "react";
import { UnreadBadge } from "@/components/layout/header/UnreadBadge";
import {
  EventAvailableIcon,
  NotificationsNoneIcon,
} from "@/components/layout/icons";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Link,
  Stack,
  Typography,
} from "@mui/material";

interface NotificationCenterProps {
  open: boolean;
  handleClose: () => void;
}

export default function NotificationCenter({
  open,
  handleClose,
}: NotificationCenterProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
          sx: { backgroundImage: "none" },
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <NotificationsNoneIcon />
        Notification Center
      </DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
      >
        <DialogContentText sx={{ fontStyle: "italic", mb: 2 }}>
          Keep up to date with Holidaze notifications.
        </DialogContentText>

        <Stack spacing={2}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <UnreadBadge
              overlap="rectangular"
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              variant="dot"
            >
              <Box>
                <Typography variant="body1">
                  Whats the best way to get to the venue?
                </Typography>
                <Typography variant="caption">by John Show</Typography>
              </Box>
            </UnreadBadge>

            <Link href="#">View</Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <UnreadBadge
              overlap="rectangular"
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              variant="dot"
            >
              <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <EventAvailableIcon />{" "}
                  <Typography variant="body1">Upcoming booking!</Typography>
                </Box>
                <Typography variant="caption">at Sunrise Inn</Typography>
              </Box>
            </UnreadBadge>
            <Link href="#">View</Link>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <EventAvailableIcon />{" "}
                <Typography variant="body1">Upcoming booking!</Typography>
              </Box>
              <Typography variant="caption">at Palm Beach House</Typography>
            </Box>
            <Link href="#">View</Link>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button aria-label="Close notifications center" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
