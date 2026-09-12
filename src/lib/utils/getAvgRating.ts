import type { Profile } from "@/lib/zod/index";

export const getAvgRating = (user: Profile) => {
  const ratedVenues = user.venues?.filter((venue) => venue.rating > 0) ?? [];
  const averageRating =
    ratedVenues.length > 0
      ? (
          ratedVenues.reduce((sum, venue) => sum + venue.rating, 0) /
          ratedVenues.length
        ).toFixed(1)
      : null;

  return { averageRating };
};
