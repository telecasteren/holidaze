import { useAuth } from "@/hooks/useAuth";
import { userBookingsQuery } from "@/lib/queries/bookingsQuery";
import { useSuspenseQuery } from "@tanstack/react-query";

/**
 * Loads the logged-in user's bookings (suspends while loading).
 * Only use where the user is known to be logged in.
 *
 * @returns `bookings`.
 */
export const useBookingsList = () => {
  const { user } = useAuth();
  const { data } = useSuspenseQuery(userBookingsQuery(user!.name));
  return { bookings: data };
};
