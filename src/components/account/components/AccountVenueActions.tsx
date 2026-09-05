import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "@tanstack/react-router";
import { deleteVenueFn } from "@/server/venueFunctions";
import type { Venue } from "@/lib/zod";

import { Stack, Box, Button, styled, IconButton } from "@mui/material";
import { EditIcon, DeleteIcon } from "@/components/layout/icons";
import { ModalWindow } from "@/components/layout/Modal";
import { venueFormTips, updateVenueFormTitle, VenueForm } from "./VenueForm";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  gap: 12,
  alignItems: "center",
  width: "fit-content"
}))

const iconStyles = {
  cursor: "pointer",
  transition: "ease-in-out 0.2s",
  "&:hover": { transform: "scale(1.2)" }
}

interface AccountVenueActionsProps {
  venue: Venue;
}

export const AccountVenueActions = ({ venue }: AccountVenueActionsProps) => {
  const router = useRouter();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteVenueFn({ data: venue.id });
      await router.invalidate();
      toast.success("Venue has been deleted.");
    } catch (error) {
      toast.error(`Delete venue failed: ${error}`);
    } finally {
      setDeleteOpen(false);
    }
  }

  return (
    <>
      {/* Edit venue modal */}
      <ModalWindow
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title={updateVenueFormTitle}
        text={venueFormTips}
        content={<VenueForm venue={venue} />}
      />

      {/* Confirm delete venue modal */}
      <ModalWindow
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Are you sure?"
        content={
          <Stack spacing={2}>
            <Button
              variant="contained"
              onClick={handleDelete}>
              Yes, delete venue
            </Button>
            <Button
              variant="outlined"
              onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
          </Stack>
        }
      />

    <StyledBox>
      <IconButton onClick={() => setEditOpen(true)}><EditIcon sx={iconStyles} /></IconButton>
      <IconButton onClick={() => setDeleteOpen(true)}><DeleteIcon sx={iconStyles}/></IconButton>
      </StyledBox>
    </>
  )
}
