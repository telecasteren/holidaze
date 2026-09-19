import { useAuth } from "@/hooks/useAuth";
import { userBookingsQuery } from "@/lib/queries/bookingsQuery";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useBookingsList = () => {
  const { user } = useAuth();
  const { data } = useSuspenseQuery(userBookingsQuery(user!.name));
  return { bookings: data };
};
