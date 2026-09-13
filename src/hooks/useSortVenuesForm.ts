import { useMemo } from "react";
import { useSortOption } from "@/hooks/useSortOption";
import type { Venue } from "@/lib/zod/index";

export const sortOptions = [
  "All",
  "Highest price",
  "Lowest price",
  "Highest rating",
] as const;
export type SortOption = (typeof sortOptions)[number];

export const useSortVenuesForm = <T extends Venue>(venues: T[]) => {
  const { option, handleChange } = useSortOption(sortOptions);

  const sortedVenues = useMemo(() => {
    const setOfVenues = [...venues];
    const ratedVenues = setOfVenues.filter((venue) => venue.rating > 0);

    switch (option) {
      case "All":
        return setOfVenues;
      case "Highest price":
        return [...setOfVenues].sort((a, b) => b.price - a.price);
      case "Lowest price":
        return [...setOfVenues].sort((a, b) => a.price - b.price);
      case "Highest rating":
        return [...ratedVenues].sort((a, b) => b.rating - a.rating);
      default:
        return setOfVenues;
    }
  }, [venues, option]);

  return {
    option,
    handleChange,
    sortedVenues,
  };
};
