import { useState } from "react"
import { useNavigate } from '@tanstack/react-router';
import type { Venue } from '@/lib/zod/index';

import { Stack, Box, Button, Typography } from '@mui/material';
import { AccountVenueCard } from "@/components/account/components/AccountVenueCard";
import { ModalWindow } from '@/components/layout/Modal';
import { newVenueTitle, newVenueTips, RegisterVenueForm } from "@/components/account/components/RegisterVenueForm";

interface VenueInfoProps {
  venueInfo: Venue[];
}

export const VenueInfo = ({ venueInfo }: VenueInfoProps) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ModalWindow
        open={open}
        onClose={() => setOpen(false)}
        title={newVenueTitle}
        text={newVenueTips}
        content={<RegisterVenueForm />}
      />
      <Stack
        spacing={2}
        sx={{ display: "grid", gap: 2 }}
      >
        <Box sx={{display: "flex", flexWrap: "wrap", justifyContent: "space-between",alignItems: "center"}}>
        <Typography variant="h4" sx={{ mb: 2 }}>Total venues: {venueInfo.length}</Typography>
        <Button
          variant="contained"
          sx={{ gridArea: 2, justifySelf: "end" }}
          onClick={() => setOpen(true)}
        >
          Register a venue
          </Button>
        </Box>

    <Box sx={{ display: "grid", gap: 2 }}>
      {venueInfo.length > 0 ? (
            venueInfo.map((venue) => (
              <AccountVenueCard key={venue.id} venue={venue}/>
          ))
    ) : (
      <Box>
        <Typography variant="body1">You haven't registered any venues yet.</Typography>
        <Box sx={{display: "flex", flexDirection: "column", gap: 1, justifySelf: "end", pr: 2, pb: 2 }}>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={() => setOpen(true)}
            >
              Register a venue
            </Button>

            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={() => navigate({ to: "/venues" })}
            >
              Get inspired!
          </Button>
        </Box>
      </Box>
        )}
          </Box>
      </Stack>
    </>
  )
};
