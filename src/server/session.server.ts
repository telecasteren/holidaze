import {
  getRequestHeader,
  setResponseHeader,
} from "@tanstack/react-start/server";
import crypto from "node:crypto";

const SESSION_COOKIE = "__Host-session";
const ONE_DAY = 60 * 60 * 24;

/** Data stored in the session cookie. */
export interface SessionPayloadProps {
  name: string;
  avatar: { url: string; alt: string } | undefined;
  accessToken: string;
  apiKey: string;
}

/** Reads `SESSION_SECRET` from the environment. Throws if it is missing. */
const getSecret = (): string => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET isn't set");
  return secret;
};

/** Creates an HMAC-SHA256 signature (base64url) of `body`. */
const sign = (body: string): string => {
  return crypto
    .createHmac("sha256", getSecret())
    .update(body)
    .digest("base64url");
};

/**
 * Turns a session payload into a signed token (`<base64url payload>.<signature>`).
 * The payload is signed, not encrypted.
 *
 * @param payload - Session data to store.
 * @returns The signed token.
 */
export const signSession = (payload: SessionPayloadProps): string => {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
};

/**
 * Checks a token's signature (timing-safe) and decodes its payload.
 *
 * @param value - Token from {@link signSession}.
 * @returns The payload, or `null` if the token is malformed, tampered with, or unreadable.
 */
export const verifySession = (value: string): SessionPayloadProps | null => {
  const [body, signature] = value.split(".");
  if (!body || !signature) return null;

  const expectedSignature = sign(body);
  const actualSignature = Buffer.from(signature);
  const bodyBuffer = Buffer.from(expectedSignature);

  if (
    actualSignature.length !== bodyBuffer.length ||
    !crypto.timingSafeEqual(actualSignature, bodyBuffer)
  )
    return null;

  try {
    return JSON.parse(
      Buffer.from(body, "base64url").toString(),
    ) as SessionPayloadProps;
  } catch {
    return null;
  }
};

/**
 * Sets the session cookie on the response: HttpOnly, Secure, SameSite=Lax, valid for one day.
 *
 * @param token - Signed token from {@link signSession}.
 */
export function setSessionCookie(token: string) {
  setResponseHeader(
    "Set-Cookie",
    [
      `${SESSION_COOKIE}=${token}`,
      `HttpOnly`,
      `Secure`,
      `SameSite=Lax`,
      `Path=/`,
      `Max-Age=${ONE_DAY}`,
    ].join("; "),
  );
}

/** Expires the session cookie on the response (logs the user out). */
export function clearSessionCookie() {
  setResponseHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
  );
}

/**
 * Reads the raw session token from the request's `cookie` header.
 *
 * @returns The token, or `null` if the cookie isn't present.
 */
export function readSessionToken(): string | null {
  const header = getRequestHeader("cookie");
  if (!header) return null;
  for (const part of header.split(/;\s*/)) {
    // Split only on the FIRST '=' — signed/base64 values often contain '='.
    const eq = part.indexOf("=");
    if (eq === -1) continue;
    if (part.slice(0, eq) === SESSION_COOKIE) return part.slice(eq + 1);
  }
  return null;
}
