import { usePopupState, bindTrigger } from "material-ui-popup-state/hooks";
import { useSearchDisplay } from "@/hooks/useSearchDisplay";
import { Controller } from "react-hook-form";

import {
  Stack,
  Box,
  Button,
  Typography,
  InputBase,
  styled,
} from "@mui/material";
import { PopoverWindow } from "@/components/layout/Popover";
import { ExploreCalendar } from "@/components/booking/ExploreCalendar";
import { GuestCountPicker } from "@/components/booking/GuestCountPicker";
import { SearchIcon } from "@/components/layout/icons";

/** Bordered, wrapping row that holds the search fields and the search button. */
const StyledBox = styled(Stack)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  [theme.breakpoints.up("xs")]: {
    justifyContent: "start",
  },
  [theme.breakpoints.up("sm")]: {
    justifyContent: "center",
  },
  alignItems: "center",
  gap: 1,
  justifySelf: "center",
  width: "fit-content",
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
  borderRadius: 10,
  padding: 2,
  marginTop: 50,
  marginBottom: 50,
}));

/** Height (px) shared by the search fields and button. */
const FIELD_HEIGHT = 80;
/** Shared styles for the "Where", "When" and "Who" fields. */
const searchSx = {
  textAlign: "start",
  justifyContent: "start",
  width: 250,
  height: FIELD_HEIGHT,
  display: "grid",
  alignContent: "center",
  gap: 0.5,
} as const;

/**
 * Search bar for venues with three fields: text ("Where"), dates ("When", in a popover calendar)
 * and guest count ("Who", in a popover). The search button writes the values to the URL.
 * Its state comes from {@link useSearchDisplay}.
 */
export const SearchDisplay = () => {
  const { control, values, dates, handleSearch } = useSearchDisplay();
  const datesPopup = usePopupState({
    variant: "popover",
    popupId: "dates-popover",
  });
  const guestsPopup = usePopupState({
    variant: "popover",
    popupId: "guests-popover",
  });

  return (
    <StyledBox>
      <Box>
        <Box
          sx={{
            ...searchSx,
            px: 2,
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 1,
            ":hover": {
              backgroundColor: (theme) => (theme.vars || theme).palette.divider,
              borderColor: (theme) => (theme.vars || theme).palette.divider,
            },
          }}
        >
          <Typography
            component="label"
            htmlFor="text-search"
            sx={{ fontSize: 12, fontWeight: "bold", color: "text.secondary" }}
          >
            Where
          </Typography>
          <Controller
            name="query"
            control={control}
            render={({ field }) => (
              <InputBase
                {...field}
                id="text-search"
                autoComplete="off"
                autoCorrect="off"
                placeholder="Search for venues"
                sx={{ "& .MuiInputBase-input": { padding: 0 } }}
              />
            )}
          />
        </Box>
      </Box>

      <Box>
        <Button
          variant="outlined"
          {...bindTrigger(datesPopup)}
          sx={{
            ...searchSx,
          }}
        >
          <Typography
            component="span"
            sx={{ fontSize: 12, fontWeight: "bold", color: "text.secondary" }}
          >
            When
          </Typography>
          {dates ?? "Add dates"}
        </Button>
        <PopoverWindow popupState={datesPopup}>
          <Controller
            name="dateRange"
            control={control}
            render={({ field }) => (
              <ExploreCalendar
                value={field.value}
                onChange={field.onChange}
                dates={dates}
              />
            )}
          />
        </PopoverWindow>
      </Box>

      <Box>
        <Button
          variant="outlined"
          {...bindTrigger(guestsPopup)}
          sx={{
            ...searchSx,
          }}
        >
          <Typography
            component="span"
            sx={{ fontSize: 12, fontWeight: "bold", color: "text.secondary" }}
          >
            Who
          </Typography>
          {values.guests ? `${values.guests} guests` : "Add guests"}
        </Button>
        <PopoverWindow popupState={guestsPopup}>
          <Controller
            name="guests"
            control={control}
            render={({ field }) => (
              <GuestCountPicker value={field.value} onChange={field.onChange} />
            )}
          />
        </PopoverWindow>
      </Box>

      <Button
        name="search"
        aria-label="search"
        onClick={handleSearch}
        sx={{ width: "fit-content", height: FIELD_HEIGHT }}
      >
        <SearchIcon />
      </Button>
    </StyledBox>
  );
};
