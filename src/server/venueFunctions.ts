import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import {
  getVenuesByProfile,
  registerNewVenue,
  updateVenue,
  deleteVenue
} from "../../services/api/venues/venues";
import { postVenueSchema, updateVenueSchema } from "@/lib/zod/index";

export const getUserVenuesFn = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: name }) => {
    return getVenuesByProfile(name);
  });

export const registerNewVenueFn = createServerFn({ method: "POST" })
  .validator(postVenueSchema)
  .handler(async ({ data }) => {
    return registerNewVenue(data);
  });

export const updateVenueFn = createServerFn({ method: "POST" })
  .validator(updateVenueSchema)
  .handler(async ({ data }) => {
    const { id, ...payload } = data;
    return updateVenue(id, payload);
  });

export const deleteVenueFn = createServerFn({ method: "POST" })
  .validator(z.string())
  .handler(async ({ data: id }) => {
    return deleteVenue(id);
  });
