import { queryOptions } from "@tanstack/react-query";
import { getAllBookings } from "@/services/api/bookings/bookings";
import { getUserBookingsFn } from "@/server/bookingFunctions";

/** Query options for all bookings. Data is considered fresh for 30 seconds. */
export const bookingsQuery = () => {
  return queryOptions({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
    staleTime: 30 * 1000,
  });
};

/**
 * Query options for a profile's bookings. Data is considered fresh for 60 seconds.
 *
 * @param userName - Profile name.
 */
export const userBookingsQuery = (userName: string) => {
  return queryOptions({
    queryKey: ["bookings", "user", userName],
    queryFn: () => getUserBookingsFn({ data: userName }),
    staleTime: 60 * 1000,
  });
};
