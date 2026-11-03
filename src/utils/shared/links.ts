// Helpers shared by the API routes and the dashboard.

export const SLUG_PATTERN = /^[A-Za-z0-9_-]{1,64}$/;

// Paths served by the app itself, which a shortlink must not shadow.
export const RESERVED_SLUGS = ["admin", "api", "invalid-link", "_next", "assets", "favicon.ico"];

export const validateSlug = (slug: string): string | null => {
  if (!slug) return "Short path is required";
  if (!SLUG_PATTERN.test(slug))
    return "Use 1-64 letters, numbers, dashes or underscores";
  if (RESERVED_SLUGS.includes(slug.toLowerCase()))
    return `"${slug}" is reserved by Pepper`;
  return null;
};

/** Adds https:// when missing and checks that the result is an http(s) URL. */
export const normalizeUrl = (value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const withProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    const url = new URL(withProtocol);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname.includes(".") && url.hostname !== "localhost") return null;
    return url.toString();
  } catch {
    return null;
  }
};

/** Turns "https://Go.Example.com/" into "go.example.com". */
export const normalizeDomain = (value: string): string =>
  value
    .trim()
    .toLowerCase()
    .replace(/^[a-z]+:\/\//, "")
    .replace(/[/?#].*$/, "");

const DOMAIN_PATTERN = /^(?=.{1,253}$)([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}(:\d{1,5})?$/;

export const validateDomain = (domain: string): string | null => {
  if (!domain) return "Domain is required";
  if (!DOMAIN_PATTERN.test(domain)) return "Enter a valid domain, e.g. go.example.com";
  return null;
};

export const randomSlug = (length = 6) => {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => chars[b % chars.length]).join("");
};
