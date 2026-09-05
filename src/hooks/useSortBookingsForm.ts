import { useMemo, useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import type { Booking } from "@/lib/zod/index";

export const sortOptions = ["Upcoming", "Newest in", "Venues"] as const;
export type SortOption = (typeof sortOptions)[number];

export const useSortBookingsForm = <T extends Booking>(bookings: T[]) => {
  const [option, setOption] = useState<SortOption>(sortOptions[0]);

  const handleChange = (event: SelectChangeEvent) => {
    setOption(event.target.value as SortOption);
  };

  const sortedBookings = useMemo(() => {
    const setOfBookings = [...bookings];

    switch (option) {
      case "Upcoming":
        return setOfBookings.sort(
          (a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
        );
        case "Newest in":
          return setOfBookings.sort(
            (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
          );
        case "Venues":
          return setOfBookings.sort((a, b) =>
            (a.venue?.name ?? "").localeCompare(b.venue?.name ?? "")
          );
      default:
        return setOfBookings;
    }
  }, [bookings, option])

  return {
    option,
    handleChange,
    sortedBookings,
  };
};
