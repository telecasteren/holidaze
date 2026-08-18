import { queryOptions } from "@tanstack/react-query";
import { getAllProfiles, getProfileById } from "../../../services/api/profiles/profiles";

export const profilesQuery = () => {
  return queryOptions({
    queryKey: ["profiles"],
    queryFn: getAllProfiles,
    staleTime: 5 * 1000,
  });
};

// API does not support id lookup, so we use name as the identifier
export const profileByIdQuery = (name: string) => {
  return queryOptions({
    queryKey: ["profile", name],
    queryFn: () => getProfileById(name),
    staleTime: 5 * 1000,
  });
};
