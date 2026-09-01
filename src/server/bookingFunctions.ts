import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { getBookingsByProfileId, getBookingById, postNewBooking } from "../../services/api/bookings/bookings";
import { apiCalendarBookingSchema } from "@/lib/zod/index";

export const getUserBookingsFn = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: name }) => {
    return getBookingsByProfileId(name);
  });

export const getBookingFn = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: id }) => {
    return getBookingById(id);
  });

export const createNewBookingFn = createServerFn({ method: "POST" })
  .validator(apiCalendarBookingSchema)
  .handler(async ({ data }) => {
    const { ...body } = data;
    return postNewBooking(body);
  });
