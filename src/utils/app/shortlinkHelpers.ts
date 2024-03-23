import { IDomain } from "@/types/domain.types";
import { Shortlink } from "@/types/shortlink.types";

export const findHostDomain = (domains: IDomain[], shortLink: Shortlink) => {
  const domain = domains.find((domain) => domain.id === shortLink.domain_id);

  if (domain) {
    return domain;
  }

  return {
    id: "",
    domain: window.location.origin,
  };
};
