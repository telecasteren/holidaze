import type { Venue } from "@/lib/zod";
import { FindMyLocation } from "@/components/location/FindMyLocation";
import { GridBox } from "@/components/GridBox";
import {
  Stack,
  Link,
  Typography,
  TextField,
  InputLabel,
  styled,
} from "@mui/material";

/** Small secondary-colored link. */
const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: 12,
  color: theme.palette.text.secondary,
  marginTop: 10,
  marginBottom: 10,
}));

/** Props for {@link VenueLocationFields}. */
interface VenueLocationFieldsProps {
  /** Venue to prefill the fields with. Leave out for empty fields. */
  venue?: Venue;
}

/**
 * Form fields for a venue's address, city, zip code, country, continent and coordinates
 * (coordinates are handled by {@link FindMyLocation}). Fields are uncontrolled.
 */
export const VenueLocationFields = ({ venue }: VenueLocationFieldsProps) => {
  return (
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
  );
};
