import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import {
  getVenuesByProfile,
  registerNewVenue
} from "../../services/api/venues/venues";
import { postVenueSchema } from "@/lib/zod/index";

// export const getVenueFn = createServerFn({ method: "GET" })
//   .validator(apiSingleVenueSchema)
//   .handler(async ({ data: id }) => {
//     return getVenueById(id);
//   });

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
