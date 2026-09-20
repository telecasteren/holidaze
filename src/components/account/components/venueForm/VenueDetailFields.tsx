import { localCurrency } from "@/lib/utils/config";
import type { Venue } from "@/lib/zod";
import type { Ref } from "react";
import type { TextEditorHandle } from "@/components/text-editor/TextEditor";
import { TextEditor } from "@/components/text-editor/TextEditor";
import { Stack, TextField, InputLabel } from "@mui/material";
import { RequiredField } from "@/components/layout/RequiredField";
import { MediaInputs } from "@/components/MediaInputs";
import { GridBox } from "@/components/GridBox";

/** Props for {@link VenueDetailFields}. */
interface VenueDetailFieldsProps {
  /** Venue to prefill the fields with. Leave out for empty fields. */
  venue?: Venue;
  /** Gives the parent access to the description editor (to read its HTML). */
  ref?: Ref<TextEditorHandle>;
}

/**
 * Form fields for a venue's name, description, media URLs, max guests and price per night.
 * Fields are uncontrolled, so the parent reads them from the form's `FormData`,
 * except the description, which is read through `ref`.
 */
export const VenueDetailFields = ({ venue, ref }: VenueDetailFieldsProps) => {
  return (
    <>
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

        <TextEditor ref={ref} defaultValue={venue?.description} />

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
    </>
  );
};
