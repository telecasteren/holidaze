import { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { queryClient } from "@/lib/queries/queryClient";
import { registerNewVenueFn, updateVenueFn } from "@/server/venueFunctions";
import { localCurrency } from "@/lib/utils/config";
import { getFormData } from "@/lib/utils/getVenueFormData";
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
  styled
} from "@mui/material";
import { toast } from "react-hot-toast";
import { TextEditor } from "@/components/text-editor/TextEditor";
import type { TextEditorHandle } from "@/components/text-editor/TextEditor";
import type { Venue } from "@/lib/zod/index";

export const updateVenueFormTitle = "Update venue";
export const registerVenueFormTitle = "Register a new venue";
export const venueFormTips = "Tips: Customers tend to favour venues with that has good information, so add as much about the venue as you can.";

interface VenueFormProps {
  venue?: Venue;
  close?: () => void;
}

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
  marginBottom: 10,
  textDecoration: "none",
}))

export const VenueForm = ({ venue, close }: VenueFormProps) => {
  const isEditing = Boolean(venue);
  const [submitting, setSubmitting] = useState(false);
  const descRef = useRef<TextEditorHandle>(null);
  const { user } = useAuth();
  if (!user) return null;

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const data = new FormData(event.currentTarget);
    const venueId = venue?.id || "";

    const {
    name,
    media,
    maxGuests,
    price,
    meta,
    location } = getFormData(data);
    const description = descRef.current?.getHTML() ?? "";
    const payload = {
      name,
      description,
      media,
      maxGuests,
      price,
      meta,
      location
    };

    try {
      const result = isEditing
      ? await updateVenueFn({ data: { id: venueId, ...payload } })
        : await registerNewVenueFn({ data: payload })

      toast.success(isEditing ? "Venue updated successfully." : "Venue registered successfully.")
      return result;
    } catch (error) {
      toast.error(isEditing ? "Failed to update venue." : "Failed to register venue.")
    } finally {
      queryClient.invalidateQueries({ queryKey: [ isEditing ? "venues" : "profile", user.name ]})
      setSubmitting(false);
    }
  }

  return (
    <Stack>
      <form id="register-venue" onSubmit={handleSubmit}
        style={{display: "flex", flexDirection: "column", gap: 2}}
      >
        <Stack sx={{ display: "grid", gap: 2 }}>
          <GridBox>
            <InputLabel htmlFor="venue-name">Name of the venue{" "} <RequiredField/></InputLabel>
            <TextField id="venue-name" name="venue-name" required placeholder="Venue name" defaultValue={venue?.name} />
          </GridBox>

          <TextEditor ref={descRef} defaultValue={venue?.description} />

          <MediaInputs id="venue-media" initialUrls={venue?.media.map(m => m.url)} />
        </Stack>

         <GridBox styles={ { marginTop: 2 }}>
          <InputLabel htmlFor="venue-guests">Max number of guests{" "} <RequiredField/></InputLabel>
          <TextField id="venue-guests" name="venue-guests" required type="number" placeholder="1" defaultValue={venue?.maxGuests} slotProps={ { htmlInput: { min: 1 } }} />
        </GridBox>

        <GridBox styles={ { marginTop: 2 }}>
          <InputLabel htmlFor="venue-price">Price per night ({localCurrency}){" "} <RequiredField/></InputLabel>
          <TextField id="venue-price" name="venue-price" required type="number" placeholder="0.00" defaultValue={venue?.price} slotProps={ { htmlInput: { min: 0 } }} />
        </GridBox>

        {/* VenueMeta tags: boolean */}
         <Stack sx={{ display: "grid", gap: 1, mt: 2 }}>
          <Typography variant="h6" component="h6">Select what your venue offers</Typography>
          <FormControlLabel
            label="Wifi available"
            control={<Checkbox id="venue-wifi" name="venue-wifi" value="wifi" defaultChecked={venue?.meta.wifi} />}
          />
          <FormControlLabel
            label="Pets allowed"
            control={<Checkbox id="venue-pets" name="venue-pets" value="pets" defaultChecked={venue?.meta.pets} />}
          />
          <FormControlLabel
            label="Parking available"
            control={<Checkbox id="venue-parking" name="venue-parking" value="parking" defaultChecked={venue?.meta.parking} />}
          />
          <FormControlLabel
            label="Breakfast included"
            control={<Checkbox id="venue-breakfast" name="venue-breakfast" value="breakfast" defaultChecked={venue?.meta.breakfast} />}
            />
        </Stack>

          {/* Venue location data */}
        <Stack sx={{ display: "grid", gap: 1, mt: 2 }}>
          <Typography variant="h6" component="h6">Location</Typography>
          <GridBox>
            <InputLabel htmlFor="venue-address">Address</InputLabel>
            <TextField id="venue-address" name="venue-address" placeholder="Address of the venue..." defaultValue={venue?.location?.address} />
          </GridBox>

          <GridBox>
            <InputLabel htmlFor="venue-city">City</InputLabel>
            <TextField id="venue-city" name="venue-city" placeholder="City..." defaultValue={venue?.location?.city} />
          </GridBox>

          <GridBox>
            <InputLabel htmlFor="venue-zip">Zip Code</InputLabel>
            <TextField id="venue-zip" name="venue-zip" placeholder="Zip code..." defaultValue={venue?.location?.zip} />
          </GridBox>

          <GridBox>
            <InputLabel htmlFor="venue-country">Country</InputLabel>
            <TextField id="venue-country" name="venue-country" placeholder="Country..." defaultValue={venue?.location?.country} />
          </GridBox>

          <GridBox>
            <InputLabel htmlFor="venue-continent">Country</InputLabel>
            <TextField id="venue-continent" name="venue-continent" placeholder="Continent..." defaultValue={venue?.location?.country} />
          </GridBox>

          <GridBox>
            <InputLabel htmlFor="venue-lat">Coordinates</InputLabel>
            <StyledLink href="https://coordinates-converter.com/en" target="_blank" rel="noreferrer"
            >
              WGS 84: online converter
            </StyledLink>
            <GridBox styles={{ gap: 1 }}>
              <TextField id="venue-lat" name="venue-lat" type="number" placeholder="Latitude..." defaultValue={venue?.location?.lat} />
              <TextField id="venue-long" name="venue-long" type="number" placeholder="Longitude..." defaultValue={venue?.location?.lng} />
            </GridBox>
          </GridBox>
        </Stack>

        <Button
          type="submit"
          variant="contained"
          onClick={close}
          disabled={submitting}
          sx={{mt: 2}}
        >
          { isEditing ? "Update venue" : "Register venue" }
        </Button>
      </form>
    </Stack>
  );
};
