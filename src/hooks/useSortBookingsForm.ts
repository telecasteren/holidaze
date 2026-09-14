import { useMemo } from "react";
import { useSortOption } from "@/hooks/useSortOption";
import type { Booking } from "@/lib/zod/index";

export const sortOptions = ["All", "Upcoming", "Venues", "Previous"] as const;
export type SortOption = (typeof sortOptions)[number];

export const useSortBookingsForm = <T extends Booking>(bookings: T[]) => {
  const { option, handleChange } = useSortOption(sortOptions);

  const sortedBookings = useMemo(() => {
    const setOfBookings = [...bookings];

    switch (option) {
      case "All":
        return setOfBookings.sort(
          (a, b) =>
            new Date(b.created).getTime() - new Date(a.created).getTime(),
        );
      case "Upcoming":
        return setOfBookings
          .filter((booking) => new Date(booking.dateFrom) > new Date())
          .sort(
            (a, b) =>
              new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
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
