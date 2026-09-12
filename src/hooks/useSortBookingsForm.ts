import { useMemo, useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import type { Booking } from "@/lib/zod/index";

export const sortOptions = [
  "All",
  "Upcoming",
  "Newest in",
  "Venues",
  "Previous",
] as const;
export type SortOption = (typeof sortOptions)[number];

export const useSortBookingsForm = <T extends Booking>(bookings: T[]) => {
  const [option, setOption] = useState<SortOption>(sortOptions[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as SortOption);
  };

  const sortedBookings = useMemo(() => {
    const setOfBookings = [...bookings];

    switch (option) {
      case "All":
        return setOfBookings;
      case "Upcoming":
        return setOfBookings
          .filter((booking) => new Date(booking.dateFrom) > new Date())
          .sort(
            (a, b) =>
              new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
          );
      case "Newest in":
        return setOfBookings.sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
      case "Venues":
        return setOfBookings.sort((a, b) =>
          (a.venue?.name ?? "").localeCompare(b.venue?.name ?? ""),
        );
      case "Previous":
        return setOfBookings
          .filter((booking) => new Date(booking.dateTo) < new Date())
          .sort(
            (a, b) =>
              new Date(b.dateTo).getTime() - new Date(a.dateTo).getTime(),
          );
      default:
        return setOfBookings;
    }
  }, [bookings, option]);

  return {
    option,
    handleChange,
    sortedBookings,
  };
};
