"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineLink, HiOutlineMagnifyingGlass, HiPlus } from "react-icons/hi2";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { IDomain } from "@/types/domain.types";
import { Shortlink } from "@/types/shortlink.types";
import { getErrorMessage, instance } from "@/utils/app/axiosInstance";
import { findDomain, getHost, getShortUrl, sameId } from "@/utils/app/shortlinkHelpers";
import EmptyState from "./EmptyState";
import LinkFormDialog from "./LinkFormDialog";
import LinkRow from "./LinkRow";
import ListSkeleton from "./ListSkeleton";
import QRDialog from "./QRDialog";

type Props = {
  links: Shortlink[] | null;
  domains: IDomain[];
  loading: boolean;
  error: string | null;
  revalidate: () => Promise<void>;
};

type Modal =
  | { kind: "none" }
  | { kind: "form"; link: Shortlink | null }
  | { kind: "delete"; link: Shortlink }
  | { kind: "qr"; link: Shortlink };

const DEFAULT_DOMAIN = "__default";

function LinksPanel({ links, domains, loading, error, revalidate }: Props) {
  const [query, setQuery] = useState("");
  const [domainFilter, setDomainFilter] = useState("");
  const [modal, setModal] = useState<Modal>({ kind: "none" });
  const searchRef = useRef<HTMLInputElement>(null);

  // "/" focuses search, "n" opens the new link form.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || document.querySelector("dialog[open]")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      } else if (e.key === "n") {
        e.preventDefault();
        setModal({ kind: "form", link: null });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (links ?? []).filter((link) => {
      if (domainFilter === DEFAULT_DOMAIN && link.domain_id != null) return false;
      if (domainFilter && domainFilter !== DEFAULT_DOMAIN && !sameId(link.domain_id, domainFilter)) return false;
      if (!q) return true;
      const host = getHost(findDomain(domains, link));
      return `${host}/${link.shortlink} ${link.longlink}`.toLowerCase().includes(q);
    });
  }, [links, domains, query, domainFilter]);

  const close = () => setModal({ kind: "none" });

  const deleteLink = async (link: Shortlink) => {
    try {
      await instance.delete("/api/db", { params: { id: link.id } });
      toast.success("Link deleted");
      close();
      await revalidate();
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const total = links?.length ?? 0;
  const newButton = (
    <button
      className="btn btn-primary btn-sm h-10 min-h-10 sm:px-4"
      onClick={() => setModal({ kind: "form", link: null })}
      data-testid="create-shortlink"
    >
      <HiPlus className="h-4 w-4" />
      New link
    </button>
  );

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="input input-bordered flex h-10 w-full items-center gap-2 sm:flex-1">
          <HiOutlineMagnifyingGlass className="h-4 w-4 shrink-0 text-base-content/50" />
          <input
            ref={searchRef}
            type="search"
            className="min-w-0 grow bg-transparent text-sm"
            placeholder="Search links"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            data-testid="search-shortlink"
          />
          <kbd className="kbd kbd-sm hidden sm:inline-flex">/</kbd>
        </label>
        <div className="flex gap-2">
          {domains.length > 0 && (
            <select
              className="select select-bordered select-sm h-10 min-h-10 flex-1 sm:w-48 sm:flex-none"
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              aria-label="Filter by domain"
            >
              <option value="">All domains</option>
              <option value={DEFAULT_DOMAIN}>{getHost(null)}</option>
              {domains.map((d) => (
                <option key={d.id} value={String(d.id)}>
                  {getHost(d)}
                </option>
              ))}
            </select>
          )}
          {newButton}
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-base-content/10 bg-base-100">
        <div className="flex items-center justify-between border-b border-base-content/10 px-4 py-2 text-xs text-base-content/50">
          <span>
            {query || domainFilter
              ? `${filtered.length} of ${total} links`
              : `${total} ${total === 1 ? "link" : "links"}`}
          </span>
        </div>

        {loading && !links ? (
          <ListSkeleton />
        ) : error && !links ? (
          <EmptyState
            icon={<HiOutlineLink className="h-6 w-6" />}
            title="Couldn't load your links"
            description={error}
            action={
              <button className="btn btn-sm" onClick={revalidate}>
                Try again
              </button>
            }
          />
        ) : total === 0 ? (
          <EmptyState
            icon={<HiOutlineLink className="h-6 w-6" />}
            title="No links yet"
            description="Create your first short link. Press N anytime to start a new one."
            action={newButton}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={<HiOutlineMagnifyingGlass className="h-6 w-6" />}
            title="No matching links"
            description="Try a different search or domain filter."
          />
        ) : (
          <ul className="divide-y divide-base-content/10" data-testid="shortlink-list">
            {filtered.map((link) => (
              <LinkRow
                key={link.id}
                link={link}
                domain={findDomain(domains, link)}
                onEdit={() => setModal({ kind: "form", link })}
                onDelete={() => setModal({ kind: "delete", link })}
                onQR={() => setModal({ kind: "qr", link })}
              />
            ))}
          </ul>
        )}
      </div>

      <LinkFormDialog
        open={modal.kind === "form"}
        link={modal.kind === "form" ? modal.link : null}
        domains={domains}
        onClose={close}
        onSaved={revalidate}
      />

      <ConfirmDialog
        open={modal.kind === "delete"}
        title="Delete this link?"
        description={
          modal.kind === "delete" && (
            <>
              <span className="font-medium text-base-content">
                {getHost(findDomain(domains, modal.link))}/{modal.link.shortlink}
              </span>{" "}
              will stop working immediately. This can&apos;t be undone.
            </>
          )
        }
        onConfirm={() => (modal.kind === "delete" ? deleteLink(modal.link) : Promise.resolve())}
        onClose={close}
      />

      {modal.kind === "qr" && (
        <QRDialog
          open
          url={getShortUrl(findDomain(domains, modal.link), modal.link.shortlink)}
          name={modal.link.shortlink}
          onClose={close}
        />
      )}
    </section>
  );
}

export default LinksPanel;
