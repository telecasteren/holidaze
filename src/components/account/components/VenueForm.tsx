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

/** Title to show for the form when editing a venue. */
export const updateVenueFormTitle = "Update venue";
/** Title to show for the form when registering a venue. */
export const registerVenueFormTitle = "Register a new venue";
/** Tips text to show next to the form. */
export const venueFormTips =
  "Tips: Customers tend to favour venues with rich information, so add as much details about the venue as you can.";

/** Props for {@link VenueForm}. */
interface VenueFormProps {
  /** The venue to edit. Leave out to register a new venue. */
  venue?: Venue;
  /** Called after a successful save, e.g. to close a modal. */
  close?: () => void;
}

/**
 * Form for registering a new venue, or editing one when `venue` is passed.
 * The fields are split into {@link VenueDetailFields}, {@link VenueMetaFields} and {@link VenueLocationFields}.
 * Renders nothing if the user isn't logged in.
 */
export const VenueForm = ({ venue, close }: VenueFormProps) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const venueId = venue?.id || "";
  const isEditing = Boolean(venue);
  const descRef = useRef<TextEditorHandle>(null);
  const { user } = useAuth();

  /** Creates or updates the venue, then refreshes the user's venue list. */
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

  /** Builds the venue payload from the form (description from the text editor) and saves it. */
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
