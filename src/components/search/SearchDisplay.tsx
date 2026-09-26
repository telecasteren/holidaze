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
import type { Theme } from "@mui/material";
import { PopoverWindow } from "@/components/layout/Popover";
import { ExploreCalendar } from "@/components/booking/ExploreCalendar";
import { GuestCountPicker } from "@/components/booking/GuestCountPicker";
import { SearchIcon } from "@/components/layout/icons";

/** Bordered, wrapping row that holds the search fields and the search button. */
const StyledBox = styled(Stack)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "auto 1fr",
  width: "100%",
  justifySelf: "center",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
  },
  backgroundColor: (theme.vars || theme).palette.background.tertiary,
  gap: 1,
  border: `1px solid ${(theme.vars || theme).palette.divider}`,
  borderRadius: 10,
  padding: 2,
  marginTop: 50,
  marginBottom: 50,
}));

/** Height (px) shared by the search fields and button. */
const FIELD_HEIGHT = 80;
/** Shared styles for the "Where", "When" and "Who" fields. */
const searchSx = (theme: Theme) =>
  ({
    color: (theme.vars || theme).palette.text.tertiary,
    backgroundColor: "transparent",
    "&:hover": { backgroundColor: (theme.vars || theme).palette.divider },
    ...theme.applyStyles("dark", {
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: (theme.vars || theme).palette.divider,
      },
    }),
    textAlign: "start",
    justifyContent: "start",
    width: 250,
    height: FIELD_HEIGHT,
    display: "grid",
    alignContent: "center",
    gap: 0.5,
    fontSize: 14,
    border: "none",
  }) as const;

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
          sx={(theme) => ({
            ...searchSx(theme),
            px: 2,
            borderRadius: 1,
          })}
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
        <Button variant="outlined" {...bindTrigger(datesPopup)} sx={searchSx}>
          <Typography
            component="span"
            sx={{
              fontSize: 12,
              fontWeight: "bold",
              color: "text.secondary",
            }}
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
        <Button variant="outlined" {...bindTrigger(guestsPopup)} sx={searchSx}>
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
        sx={(theme) => ({
          gridColumn: 2,
          gridRow: "1 / span 3",
          alignSelf: "stretch",
          height: { xs: "auto", md: FIELD_HEIGHT },
          width: { xs: "100%", md: "fit-content" },

          backgroundColor: (theme.vars || theme).palette.divider,
          "&:hover": {
            backgroundColor: (theme.vars || theme).palette.primary.light,
          },
          ...theme.applyStyles("dark", {
            "&:hover": {
              backgroundColor: (theme.vars || theme).palette.info.main,
            },
          }),
        })}
      >
        <SearchIcon />
      </Button>
    </StyledBox>
  );
};
