import { useNotifications } from "@/hooks/useNotifications";
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

export const NotificationCenter = ({
  open,
  handleClose,
}: NotificationCenterProps) => {
  const { notifications, markAsClicked } = useNotifications();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="Notifications center"
      aria-describedby="Notifications dialogue window"
      closeAfterTransition={false}
      slotProps={{
        paper: {
          onSubmit: (event: React.SubmitEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
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
          {notifications.map((n) => (
            <Box
              key={n.id}
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
                invisible={n.clicked}
              >
                <Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {n.type === "booking" && <EventAvailableIcon />}{" "}
                    <Typography variant="body1">{n.title}</Typography>
                  </Box>
                  <Typography variant="caption">{n.subtitle}</Typography>
                </Box>
              </UnreadBadge>
              <Link href={n.href} onClick={() => markAsClicked(n.id)}>
                View
              </Link>
            </Box>
          ))}
        </Stack>
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button aria-label="Close notifications center" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
