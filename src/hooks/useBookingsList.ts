import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { getUserBookingsFn } from "@/server/bookingFunctions";
import type { Bookings } from "@/lib/zod/index";

export const useProfileBookings = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Bookings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return
    }
    setIsLoading(true);
    getUserBookingsFn({ data: user.name })
      .then((result) => setBookings(result))
      .finally(() => setIsLoading(false));
  }, [user]);

return { bookings, isLoading }
};
