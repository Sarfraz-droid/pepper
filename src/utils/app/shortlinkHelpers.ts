import { IDomain } from "@/types/domain.types";
import { Shortlink } from "@/types/shortlink.types";
import { normalizeDomain } from "@/utils/shared/links";

export const sameId = (a: unknown, b: unknown) =>
  a != null && b != null && String(a) === String(b);

export const findDomain = (domains: IDomain[], link: Pick<Shortlink, "domain_id">) =>
  domains.find((domain) => sameId(domain.id, link.domain_id)) ?? null;

const currentOrigin = () => (typeof window === "undefined" ? "" : window.location.origin);
const currentHost = () => (typeof window === "undefined" ? "" : window.location.host);

/** The host shown before the slug, e.g. "go.example.com". */
export const getHost = (domain: IDomain | null) =>
  domain ? normalizeDomain(domain.domain) : currentHost();

export const getShortUrl = (domain: IDomain | null, slug: string) =>
  domain
    ? `https://${normalizeDomain(domain.domain)}/${slug}`
    : `${currentOrigin()}/${slug}`;

export const prettyUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Clipboard API is unavailable on insecure origins; fall back to execCommand.
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand("copy");
    area.remove();
    return ok;
  }
};
