import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import {
  getBookingsByProfileId,
  postNewBooking,
} from "@/services/api/bookings/bookings";
import { apiCalendarBookingSchema } from "@/lib/zod/index";
import { withServerErrors } from "@/server/serverErrors";

export const getUserBookingsFn = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: name }) => {
    return withServerErrors(() => getBookingsByProfileId(name));
  });

export const createNewBookingFn = createServerFn({ method: "POST" })
  .validator(apiCalendarBookingSchema)
  .handler(async ({ data }) => {
    const { ...body } = data;
    return withServerErrors(() => postNewBooking(body));
  });
