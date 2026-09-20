import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import {
  getVenuesByProfile,
  registerNewVenue,
  updateVenue,
  deleteVenue,
} from "@/services/api/venues/venues";
import { postVenueSchema, updateVenueSchema } from "@/lib/zod/index";
import { withServerErrors } from "@/server/serverErrors";

/** Server function: gets the venues owned by a profile (input: profile name). */
export const getUserVenuesFn = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: name }) => {
    return withServerErrors(() => getVenuesByProfile(name));
  });

/** Server function: creates a new venue. */
export const registerNewVenueFn = createServerFn({ method: "POST" })
  .validator(postVenueSchema)
  .handler(async ({ data }) => {
    return withServerErrors(() => registerNewVenue(data));
  });

/** Server function: updates a venue. The input must include the venue `id`. */
export const updateVenueFn = createServerFn({ method: "POST" })
  .validator(updateVenueSchema)
  .handler(async ({ data }) => {
    const { id, ...payload } = data;
    return withServerErrors(() => updateVenue(id, payload));
  });

/** Server function: deletes a venue (input: venue ID). */
export const deleteVenueFn = createServerFn({ method: "POST" })
  .validator(z.string())
  .handler(async ({ data: id }) => {
    return withServerErrors(() => deleteVenue(id));
  });
