import { describe, expect, beforeEach, vi, test } from "vitest";
import { z } from "zod";
import { ApiError } from "../../services/api/api-config/apiError";
import { withApiHandler } from "../../services/api/api-config/handler";

describe("withApiHandler", () => {
  const schema = z.object({
    id: z.string(),
    title: z.string(),
  });

  beforeEach(() => {
    vi.resetAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  test("returns parsed payload when valid", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: "1", title: "Venue 1" }), {
        status: 200,
      }),
    );

    const handler = withApiHandler({
      endpoint: (id: string) => `/venues/${id}`,
      schema,
      baseUrl: "holidaze",
    });

    await expect(handler("1")).resolves.toEqual({
      id: "1",
      title: "Venue 1",
    });

    expect(globalThis.fetch).toHaveBeenCalledWith(
      "holidaze/venues/1",
      undefined,
    );
  });

  test("throws error when payload fails validation", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ id: 123, title: "Wrong type" })),
    );

    const handler = withApiHandler({
      endpoint: (id: string) => `/venues/${id}`,
      schema,
      baseUrl: "holidaze",
    });

    const result = handler("1");

    await expect(result).rejects.toBeInstanceOf(ApiError);
    await expect(result).rejects.toMatchObject({
      message: "Payload failed schema validation",
      status: 500,
    });
  });

  test("throws error when response !ok", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue(
      new Response("Not found", { status: 404 }),
    );

    const handler = withApiHandler({
      endpoint: "/unknown",
      schema,
      baseUrl: "holidaze",
    });

    await expect(handler()).rejects.toBeInstanceOf(ApiError);
    await expect(handler()).rejects.toMatchObject({
      status: 404,
    });
  });
});
