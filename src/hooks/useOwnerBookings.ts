import { useAuth } from "@/hooks/useAuth";
import { userBookingsQuery } from "@/lib/queries/bookingsQuery";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useOwnerBookings = () => {
  const { user } = useAuth();
  const { data } = useSuspenseQuery(userBookingsQuery(user!.name));
  return { bookings: data.data };
};
