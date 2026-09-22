import { useMemo } from "react";
import { getMonthlyRevenue } from "@/lib/utils/getMonthlyRevenue";
import { useAuth } from "./useAuth";
import { useSuspenseQuery } from "@tanstack/react-query";
import { venuesByProfileQuery } from "@/lib/queries/venuesQuery";
import { getLocalTimeZone, today } from "@internationalized/date";

export const useManagerRevenue = (
  year: number = today(getLocalTimeZone()).year,
) => {
  const { user } = useAuth();
  const { data } = useSuspenseQuery(venuesByProfileQuery(user!.name));
  return useMemo(() => getMonthlyRevenue(data.data, year), [data.data, year]);
};
