import { queryOptions } from "@tanstack/react-query";
import { getProfileFn } from "@/server/profileFunctions";

// API does not support id lookup, so we use name as the identifier
export const profileByIdQuery = (name: string) => {
  return queryOptions({
    queryKey: ["profile", name],
    queryFn: () => getProfileFn({data: name}),
    staleTime: 5 * 1000,
  });
};
