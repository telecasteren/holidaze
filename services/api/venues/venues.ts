import { z } from "zod";
import { apiVenueSchema, apiSingleVenueSchema } from "@/lib/zod/index";
import { withApiHandler} from "../api-config/handler";
import {  getAuthHeaders } from "../api-config/headers";
import { API_URL, VENUES, VENUES_PARAMS, PROFILES } from "../api-config/endpoints";
import type { VenuePayload } from "@/lib/zod/index";

export const getAllVenues = withApiHandler({
  label: "getAllVenues",
  endpoint:  `${API_URL}${VENUES}`,
  schema: apiVenueSchema,
});

export const getVenuesByProfile = withApiHandler({
  label: "getVenuesByProfile",
  endpoint:  (name: string) => `${API_URL}${PROFILES}/${name}${VENUES}${VENUES_PARAMS}`,
  schema: apiVenueSchema,
  init: () => ({ headers: getAuthHeaders() })
});

export const getVenueById = withApiHandler({
  label: "getVenueById",
  endpoint: (id: string) => `${API_URL}${VENUES}/${id}${VENUES_PARAMS}`,
  schema: apiSingleVenueSchema,
});

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

export const deleteVenue = withApiHandler({
  label: "deleteVenue",
  endpoint: (id: string) => `${API_URL}${VENUES}/${id}`,
  schema: z.void(),
  init: () => ({
    method: "DELETE",
    headers: getAuthHeaders(),
  })
})
