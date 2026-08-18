import { queryOptions } from "@tanstack/react-query";
import { getAllBookings, getBookingById } from "../../../services/api/booking/bookings";

export const bookingsQuery = () => {
  return queryOptions({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
    staleTime: 5 * 1000,
  });
};

export const bookingByIdQuery = (id: string) => {
  return queryOptions({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id),
    staleTime: 5 * 1000,
  });
};
