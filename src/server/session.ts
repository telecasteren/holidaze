import {
  getRequestHeader,
  setResponseHeader,
} from '@tanstack/react-start/server'
import crypto from "node:crypto";

const SESSION_COOKIE = '__Host-session'
const ONE_DAY = 60 * 60 * 24

export interface SessionPayloadProps {
  name: string;
  accessToken: string;
  apiKey: string;
}

const getSecret = (): string => {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET isn't set")
  return secret
}

const sign = (body: string): string => {
  return crypto.createHmac("sha256", getSecret()).update(body).digest("base64url");
}

export const signSession = (payload: SessionPayloadProps): string => {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${body}.${sign(body)}`;
}

export const verifySession = (value: string): SessionPayloadProps | null => {
  const [body, signature] = value.split(".");
  if (!body || !signature) return null

  const expectedSignature = sign(body);
  const actualSignature = Buffer.from(signature);
  const bodyBuffer = Buffer.from(expectedSignature);

  if (actualSignature.length !== bodyBuffer.length || !crypto.timingSafeEqual(actualSignature, bodyBuffer)) return null;

  try {
    return JSON.parse(Buffer.from(body, "base64url").toString()) as SessionPayloadProps
  } catch {
    return null;
  }
}

export function setSessionCookie(token: string) {
  setResponseHeader(
    'Set-Cookie',
    [
      `${SESSION_COOKIE}=${token}`,
      `HttpOnly`,
      `Secure`,
      `SameSite=Lax`,
      `Path=/`,
      `Max-Age=${ONE_DAY}`,
    ].join('; '),
  )
}

export function clearSessionCookie() {
  setResponseHeader(
    'Set-Cookie',
    `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`,
  )
}

export function readSessionToken(): string | null {
  const header = getRequestHeader('cookie')
  if (!header) return null
  for (const part of header.split(/;\s*/)) {
    // Split only on the FIRST '=' — signed/base64 values often contain '='.
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq) === SESSION_COOKIE) return part.slice(eq + 1)
  }
  return null
}
