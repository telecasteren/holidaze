import { z } from "zod";
import { apiVenueSchema, apiSingleVenueSchema } from "@/lib/zod/index";
import { withApiHandler } from "@/services/api/api-config/handler";
import { getAuthHeaders } from "@/services/api/api-config/headers";
import {
  API_URL,
  VENUES,
  VENUES_PARAMS,
  PROFILES,
} from "@/services/api/api-config/endpoints";
import type { VenuePayload } from "@/lib/zod/index";

/**
 * Fetches a page of venues (10 per page, newest first). Uses the search endpoint when `query` is set.
 *
 * @param page - Page number.
 * @param query - Search text (empty for all venues).
 * @param includeBookings - Whether to include each venue's bookings.
 */
export const getAllVenues = withApiHandler({
  label: "getAllVenues",
  endpoint: (page: number, query: string, includeBookings: boolean) => {
    const bookingsParam = includeBookings ? "_bookings=true&" : "";
    return query
      ? `${API_URL}${VENUES}/search?q=${encodeURIComponent(query)}&${bookingsParam}sort=created&sortOrder=desc&limit=10&page=${page}`
      : `${API_URL}${VENUES}?${bookingsParam}sort=created&sortOrder=desc&limit=10&page=${page}`;
  },
  schema: apiVenueSchema,
});

/**
 * Fetches the venues owned by a profile (requires login).
 *
 * @param name - Profile name.
 */
export const getVenuesByProfile = withApiHandler({
  label: "getVenuesByProfile",
  endpoint: (name: string) =>
    `${API_URL}${PROFILES}/${name}${VENUES}${VENUES_PARAMS}&limit=100`,
  schema: apiVenueSchema,
  init: () => ({ headers: getAuthHeaders() }),
});

/**
 * Fetches a single venue with its owner and bookings.
 *
 * @param id - Venue ID.
 */
export const getVenueById = withApiHandler({
  label: "getVenueById",
  endpoint: (id: string) => `${API_URL}${VENUES}/${id}${VENUES_PARAMS}`,
  schema: apiSingleVenueSchema,
});

/**
 * Creates a venue (requires login).
 *
 * @param body - Venue data.
 */
export const registerNewVenue = withApiHandler({
  label: "registerNewVenue",
  endpoint: `${API_URL}${VENUES}`,
  schema: apiSingleVenueSchema,
  init: (body: VenuePayload) => ({
    method: "POST",
    headers: getAuthHeaders(true),
    body: JSON.stringify(body),
  }),
});

/**
 * Updates a venue with a PUT (requires login).
 *
 * @param id - Venue ID.
 * @param body - Venue data.
 */
export const updateVenue = withApiHandler({
  label: "updateVenue",
  endpoint: (id: string, _body: VenuePayload) => `${API_URL}${VENUES}/${id}`,
  schema: apiSingleVenueSchema,
  init: (_id: string, body: VenuePayload) => ({
    method: "PUT",
    headers: getAuthHeaders(true),
    body: JSON.stringify(body),
  }),
});

/**
 * Deletes a venue (requires login).
 *
 * @param id - Venue ID.
 */
export const deleteVenue = withApiHandler({
  label: "deleteVenue",
  endpoint: (id: string) => `${API_URL}${VENUES}/${id}`,
  schema: z.void(),
  init: () => ({
    method: "DELETE",
    headers: getAuthHeaders(),
  }),
});
