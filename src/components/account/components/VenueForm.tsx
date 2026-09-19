import { useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { registerNewVenueFn, updateVenueFn } from "@/server/venueFunctions";
import { getFormData } from "@/lib/utils/getVenueFormData";
import { toast } from "react-hot-toast";
import type { Venue, VenuePayload } from "@/lib/zod/index";
import type { TextEditorHandle } from "@/components/text-editor/TextEditor";

import { Stack, Button } from "@mui/material";
import { VenueDetailFields } from "./venueForm/VenueDetailFields";
import { VenueMetaFields } from "./venueForm/VenueMetaFields";
import { VenueLocationFields } from "./venueForm/VenueLocationFields";

export const updateVenueFormTitle = "Update venue";
export const registerVenueFormTitle = "Register a new venue";
export const venueFormTips =
  "Tips: Customers tend to favour venues with that has good information, so add as much about the venue as you can.";

interface VenueFormProps {
  venue?: Venue;
  close?: () => void;
}

export const VenueForm = ({ venue, close }: VenueFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const venueId = venue?.id || "";
  const isEditing = Boolean(venue);
  const descRef = useRef<TextEditorHandle>(null);
  const { user } = useAuth();

  const addOrUpdate = useMutation({
    mutationFn: (payload: VenuePayload) =>
      isEditing
        ? updateVenueFn({ data: { id: venueId, ...payload } })
        : registerNewVenueFn({ data: payload }),
    onMutate: () => {
      toast.loading(isEditing ? "Updating..." : "Registering...", {
        duration: 10000,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["venues", "profile", user?.name],
      });
      toast.remove();
      toast.success(isEditing ? "Venue is updated." : "Venue is registered.");
      close?.();
    },
    onError: () => {
      toast.error(
        isEditing ? "Failed to update venue." : "Failed to register venue.",
      );
    },
    onSettled: () => {
      router.invalidate();
    },
  });

  if (!user) return null;

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const { name, media, maxGuests, price, meta, location } = getFormData(data);
    const description = descRef.current?.getHTML() ?? "";
    const payload = {
      name,
      description,
      media,
      maxGuests,
      price,
      meta,
      location,
    };
    addOrUpdate.mutate(payload);
  };

  return (
    <Stack sx={{ width: { xs: 300, sm: 500, md: 800, lg: 1000 } }}>
      <form
        id="register-venue"
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
        <VenueDetailFields venue={venue} ref={descRef} />
        <VenueMetaFields venue={venue} />
        <VenueLocationFields venue={venue} />

        <Button
          type="submit"
          variant="contained"
          disabled={addOrUpdate.isPending}
          sx={{ mt: 2 }}
        >
          {isEditing ? "Update venue" : "Register venue"}
        </Button>
      </form>
    </Stack>
  );
};
