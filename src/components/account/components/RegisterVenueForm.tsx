import { useState, useRef } from "react";
import { useAuth } from "@/hooks/useAuth";
import { queryClient } from "@/lib/queries/queryClient";
import { registerNewVenueFn } from "@/server/venueFunctions";
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

export const newVenueTitle = "Register a new venue";
export const newVenueTips = "Tips: Customers tend to favour venues with that has good information, so add as much about the venue as you can.";

interface RegisterVenueForm {
  close?: () => void;
}

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
  marginBottom: 10,
  textDecoration: "none",
}))

export const RegisterVenueForm = ({ close }: RegisterVenueForm) => {
  const [submitting, setSubmitting] = useState(false);
  const descRef = useRef<TextEditorHandle>(null);
  const { user } = useAuth();
  if (!user) return null;

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const data = new FormData(event.currentTarget);

    const {
    name,
    media,
    maxGuests,
    price,
    meta,
    location } = getFormData(data);
    const description = descRef.current?.getHTML() ?? "";

    try {
      const result = await registerNewVenueFn({
        data:
        {
          name,
          description,
          media,
          maxGuests,
          price,
          meta,
          location
        }
      });

      console.log(JSON.stringify(result)); // debugging
      toast.success("Venue registered successfully.")
      return result;
    } catch (error) {
      toast.error("Failed to register venue.")
    } finally {
      queryClient.invalidateQueries({ queryKey: [ "profile", user.name ]})
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
            <TextField id="venue-name" name="venue-name" required placeholder="Venue name" />
          </GridBox>

          <TextEditor ref={descRef} />

          <MediaInputs id="venue-media"/>
        </Stack>

         <GridBox styles={ { marginTop: 2 }}>
          <InputLabel htmlFor="venue-guests">Max number of guests{" "} <RequiredField/></InputLabel>
          <TextField id="venue-guests" name="venue-guests" required type="number" placeholder="1" slotProps={ { htmlInput: { min: 1 } }} />
        </GridBox>

        <GridBox styles={ { marginTop: 2 }}>
          <InputLabel htmlFor="venue-price">Price per night ({localCurrency}){" "} <RequiredField/></InputLabel>
          <TextField id="venue-price" name="venue-price" required type="number" placeholder="0.00" slotProps={ { htmlInput: { min: 0 } }} />
        </GridBox>

        {/* VenueMeta tags: boolean */}
         <Stack sx={{ display: "grid", gap: 1, mt: 2 }}>
          <Typography variant="h6" component="h6">Select what your venue offers</Typography>
          <FormControlLabel
            label="Wifi available"
            control={<Checkbox id="venue-wifi" name="venue-wifi" value="wifi" />}
          />
          <FormControlLabel
            label="Pets allowed"
            control={<Checkbox id="venue-pets" name="venue-pets" value="pets" />}
          />
          <FormControlLabel
            label="Parking available"
            control={<Checkbox id="venue-parking" name="venue-parking" value="parking" />}
          />
          <FormControlLabel
            label="Breakfast included"
            control={<Checkbox id="venue-breakfast" name="venue-breakfast" value="breakfast" />}
            />
        </Stack>

          {/* Venue location data */}
        <Stack sx={{ display: "grid", gap: 1, mt: 2 }}>
          <Typography variant="h6" component="h6">Location</Typography>
          <GridBox>
            <InputLabel htmlFor="venue-address">Address</InputLabel>
            <TextField id="venue-address" name="venue-address" placeholder="Address of the venue..." />
          </GridBox>

          <GridBox>
            <InputLabel htmlFor="venue-city">City</InputLabel>
            <TextField id="venue-city" name="venue-city" placeholder="City..." />
          </GridBox>

          <GridBox>
            <InputLabel htmlFor="venue-zip">Zip Code</InputLabel>
            <TextField id="venue-zip" name="venue-zip" placeholder="Zip code..." />
          </GridBox>

          <GridBox>
            <InputLabel htmlFor="venue-country">Country</InputLabel>
            <TextField id="venue-country" name="venue-country" placeholder="Country..." />
          </GridBox>

          <GridBox>
            <InputLabel htmlFor="venue-continent">Country</InputLabel>
            <TextField id="venue-continent" name="venue-continent" placeholder="Continent..." />
          </GridBox>

          <GridBox>
            <InputLabel htmlFor="venue-lat">Coordinates</InputLabel>
            <StyledLink href="https://coordinates-converter.com/en" target="_blank" rel="noreferrer"
            >
              WGS 84: online converter
            </StyledLink>
            <GridBox styles={{ gap: 1 }}>
              <TextField id="venue-lat" name="venue-lat" type="number" placeholder="Latitude..." />
              <TextField id="venue-long" name="venue-long" type="number" placeholder="Longitude..." />
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
          Register venue
        </Button>
      </form>
    </Stack>
  );
};
