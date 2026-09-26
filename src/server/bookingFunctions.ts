import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import {
  deleteBooking,
  getBookingsByProfileId,
  postNewBooking,
  updateBooking,
} from "@/services/api/bookings/bookings";
import { updateBookingSchema, createBookingSchema } from "@/lib/zod/index";
import { withServerErrors } from "@/server/serverErrors";

/** Server function: gets a profile's bookings (input: profile name). */
export const getUserBookingsFn = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: name }) => {
    return withServerErrors(() => getBookingsByProfileId(name));
  });

/** Server function: creates a new booking. */
export const createNewBookingFn = createServerFn({ method: "POST" })
  .validator(createBookingSchema)
  .handler(async ({ data }) => {
    return withServerErrors(() => postNewBooking(data));
  });

/** Server function: updates a booking. The input must include the venue `id`. */
export const updateBookingFn = createServerFn({ method: "POST" })
  .validator(updateBookingSchema)
  .handler(async ({ data }) => {
    const { id, ...payload } = data;
    return withServerErrors(() => updateBooking(id, payload));
  });

/** Server function: deletes a booking (input: booking ID). */
export const deleteBookingFn = createServerFn({ method: "POST" })
  .validator(z.string())
  .handler(async ({ data: id }) => {
    return withServerErrors(() => deleteBooking(id));
  });
