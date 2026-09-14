import { useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { registerNewVenueFn, updateVenueFn } from "@/server/venueFunctions";
import { localCurrency } from "@/lib/utils/config";
import { getFormData } from "@/lib/utils/getVenueFormData";
import type { Venue, VenuePayload } from "@/lib/zod/index";

import { FindMyLocation } from "@/components/location/FindMyLocation";
import { RequiredField } from "@/components/layout/RequiredField";
import { MediaInputs } from "@/components/MediaInputs";
import { GridBox } from "@/components/GridBox";
import {
  Stack,
  FormControlLabel,
  Checkbox,
  TextField,
  Button,
  InputLabel,
  Typography,
  Link,
  styled,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { TextEditor } from "@/components/text-editor/TextEditor";
import type { TextEditorHandle } from "@/components/text-editor/TextEditor";

export const updateVenueFormTitle = "Update venue";
export const registerVenueFormTitle = "Register a new venue";
export const venueFormTips =
  "Tips: Customers tend to favour venues with that has good information, so add as much about the venue as you can.";

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
  marginTop: 10,
  marginBottom: 10,
}));

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
      toast(isEditing ? "Updating..." : "Registering...", { duration: 10000 });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["venues", "profile", user?.name],
      });
      close?.();
    },
    onError: () => {
      toast.error(
        isEditing ? "Failed to update venue." : "Failed to register venue.",
      );
    },
    onSettled: () => {
      toast.remove();
      toast.success(
        isEditing
          ? "Venue updated successfully."
          : "Venue registered successfully.",
      );
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
        <Stack sx={{ display: "grid", gap: 2 }}>
          <GridBox>
            <InputLabel htmlFor="venue-name">
              Name of the venue <RequiredField />
            </InputLabel>
            <TextField
              id="venue-name"
              name="venue-name"
              required
              placeholder="Venue name"
              defaultValue={venue?.name}
            />
          </GridBox>

          <TextEditor ref={descRef} defaultValue={venue?.description} />

          <MediaInputs
            id="venue-media"
            initialUrls={venue?.media.map((m) => m.url)}
          />
        </Stack>

        <GridBox styles={{ marginTop: 2 }}>
          <InputLabel htmlFor="venue-guests">
            Max number of guests <RequiredField />
          </InputLabel>
          <TextField
            id="venue-guests"
            name="venue-guests"
            required
            type="number"
            placeholder="1"
            defaultValue={venue?.maxGuests}
            slotProps={{ htmlInput: { min: 1 } }}
          />
        </GridBox>

        <GridBox styles={{ marginTop: 2 }}>
          <InputLabel htmlFor="venue-price">
            Price per night ({localCurrency}) <RequiredField />
          </InputLabel>
          <TextField
            id="venue-price"
            name="venue-price"
            required
            type="number"
            placeholder="0.00"
            defaultValue={venue?.price}
            slotProps={{ htmlInput: { min: 0 } }}
          />
        </GridBox>

        {/* VenueMeta tags: boolean */}
        <Stack sx={{ display: "grid", gap: 1, mt: 2 }}>
          <Typography variant="h6" component="h6">
            Select what your venue offers
          </Typography>
          <FormControlLabel
            label="Wifi available"
            control={
              <Checkbox
                id="venue-wifi"
                name="venue-wifi"
                value="wifi"
                defaultChecked={venue?.meta.wifi}
              />
            }
          />
          <FormControlLabel
            label="Pets allowed"
            control={
              <Checkbox
                id="venue-pets"
                name="venue-pets"
                value="pets"
                defaultChecked={venue?.meta.pets}
              />
            }
          />
          <FormControlLabel
            label="Parking available"
            control={
              <Checkbox
                id="venue-parking"
                name="venue-parking"
                value="parking"
                defaultChecked={venue?.meta.parking}
              />
            }
          />
          <FormControlLabel
            label="Breakfast included"
            control={
              <Checkbox
                id="venue-breakfast"
                name="venue-breakfast"
                value="breakfast"
                defaultChecked={venue?.meta.breakfast}
              />
            }
          />
        </Stack>

        {/* Venue location data */}
        <Stack sx={{ display: "grid", gap: 1, mt: 2 }}>
          <Typography variant="h6" component="h6">
            Location
          </Typography>

          <GridBox id="address">
            <InputLabel htmlFor="venue-address">Address</InputLabel>
            <TextField
              id="venue-address"
              name="venue-address"
              placeholder="Address of the venue..."
              defaultValue={venue?.location?.address}
            />
          </GridBox>

          <GridBox id="city">
            <InputLabel htmlFor="venue-city">City</InputLabel>
            <TextField
              id="venue-city"
              name="venue-city"
              placeholder="City..."
              defaultValue={venue?.location?.city}
            />
          </GridBox>

          <GridBox id="zip">
            <InputLabel htmlFor="venue-zip">Zip Code</InputLabel>
            <TextField
              id="venue-zip"
              name="venue-zip"
              placeholder="Zip code..."
              defaultValue={venue?.location?.zip}
            />
          </GridBox>

          <GridBox id="country">
            <InputLabel htmlFor="venue-country">Country</InputLabel>
            <TextField
              id="venue-country"
              name="venue-country"
              placeholder="Country..."
              defaultValue={venue?.location?.country}
            />
          </GridBox>

          <GridBox id="continent">
            <InputLabel htmlFor="venue-continent">Continent</InputLabel>
            <TextField
              id="venue-continent"
              name="venue-continent"
              placeholder="Continent..."
              defaultValue={venue?.location?.country}
            />
          </GridBox>

          <GridBox id="coordinates">
            <InputLabel htmlFor="venue-lat">Coordinates</InputLabel>
            <StyledLink
              href="https://coordinates-converter.com/en"
              target="_blank"
              rel="noreferrer"
            >
              WGS 84: online converter
            </StyledLink>
            <FindMyLocation />
          </GridBox>
        </Stack>

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
