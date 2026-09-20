import type { Profile } from "@/lib/zod/index";

/**
 * Calculates the average rating of a profile's venues, ignoring unrated venues (rating 0).
 *
 * @param user - The profile whose venues to average.
 * @returns `averageRating` as a string with one decimal, or `null` if no venue is rated.
 */
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
