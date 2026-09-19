import { queryOptions } from "@tanstack/react-query";
import { getAllBookings } from "@/services/api/bookings/bookings";
import { getUserBookingsFn } from "@/server/bookingFunctions";

export const bookingsQuery = () => {
  return queryOptions({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
    staleTime: 5 * 1000,
  });
};

export const userBookingsQuery = (userName: string) => {
  return queryOptions({
    queryKey: ["bookings", "user", userName],
    queryFn: () => getUserBookingsFn({ data: userName }),
    staleTime: 5 * 1000,
  });
};
