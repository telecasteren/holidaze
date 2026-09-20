import { queryOptions } from "@tanstack/react-query";
import { getProfileFn } from "@/server/profileFunctions";

/**
 * Query options for a single profile. The API has no ID lookup, so the profile name is used as the identifier.
 * Data is considered fresh for 60 seconds.
 *
 * @param name - Profile name.
 */
export const profileByIdQuery = (name: string) => {
  return queryOptions({
    queryKey: ["profile", name],
    queryFn: () => getProfileFn({ data: name }),
    staleTime: 60 * 1000,
  });
};
