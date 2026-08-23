import { z } from "zod";
import { createServerFn } from "@tanstack/react-start";
import { getProfileById } from "../../services/api/profiles/profiles";

export const getProfileFn = createServerFn({ method: "GET" })
  .validator(z.string())
  .handler(async ({ data: name }) => {
    return getProfileById(name);
  });
