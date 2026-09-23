import { useAuth } from "@/hooks/useAuth";
import { Button, Stack } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBookingFn } from "@/server/bookingFunctions";
import { toast } from "react-hot-toast";
import type { Booking } from "@/lib/zod";

interface DeleteBookingFormProps {
  booking: Booking;
  close?: () => void;
}

export const DeleteBookingForm = ({
  booking,
  close,
}: DeleteBookingFormProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: () => deleteBookingFn({ data: booking.id }),
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings", "user", user!.name],
      });

      toast.success("Booking has been deleted.");
      close?.();
    },
    onError: () => {
      toast.error(`Failed deleting booking.`);
    },
  });

  return (
    <Stack spacing={2}>
      <Button
        variant="contained"
        onClick={() => deleteMutation.mutate()}
        disabled={deleteMutation.isPending}
      >
        Yes, delete booking
      </Button>
      <Button variant="outlined" onClick={() => close?.()}>
        Cancel
      </Button>
    </Stack>
  );
};
