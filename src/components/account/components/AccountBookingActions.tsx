import { useState } from "react";
import type { Booking } from "@/lib/zod";

import { Box, styled, IconButton } from "@mui/material";
import { EditIcon, DeleteIcon } from "@/components/layout/icons";
import { ModalWindow } from "@/components/layout/Modal";
import { BookingForm } from "@/components/account/components/BookingForm";
import { DeleteBookingForm } from "@/components/account/components/booking/DeleteBookingForm";

const StyledBox = styled(Box)(() => ({
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  margin: 20,
  alignItems: "center",
  width: "fit-content",
}));

const iconStyles = {
  cursor: "pointer",
  transition: "ease-in-out 0.2s",
};

interface BookingActionsProps {
  booking: Booking;
}

export const AccountBookingActions = ({ booking }: BookingActionsProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  return (
    <>
      {/* Edit booking modal */}
      <ModalWindow
        open={editOpen}
        onClose={() => setEditOpen(false)}
        title="Update booking"
        content={
          <BookingForm booking={booking} close={() => setEditOpen(false)} />
        }
      />

      {/* Confirm delete booking modal */}
      <ModalWindow
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Are you sure?"
        content={
          <DeleteBookingForm
            booking={booking}
            close={() => setDeleteOpen(false)}
          />
        }
      />

      {/* triggers */}
      <StyledBox>
        <IconButton onClick={() => setEditOpen(true)}>
          <EditIcon sx={iconStyles} />
        </IconButton>
        <IconButton onClick={() => setDeleteOpen(true)}>
          <DeleteIcon sx={iconStyles} />
        </IconButton>
      </StyledBox>
    </>
  );
};
