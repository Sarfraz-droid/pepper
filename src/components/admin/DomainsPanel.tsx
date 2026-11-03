"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  HiCheck,
  HiOutlineGlobeAlt,
  HiOutlineInformationCircle,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiPlus,
  HiXMark,
} from "react-icons/hi2";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { IDomain } from "@/types/domain.types";
import { Shortlink } from "@/types/shortlink.types";
import { getErrorMessage, instance } from "@/utils/app/axiosInstance";
import { getHost, sameId } from "@/utils/app/shortlinkHelpers";
import { normalizeDomain, validateDomain } from "@/utils/shared/links";
import EmptyState from "./EmptyState";
import ListSkeleton from "./ListSkeleton";

type Props = {
  domains: IDomain[] | null;
  links: Shortlink[];
  loading: boolean;
  error: string | null;
  revalidate: () => Promise<void>;
  revalidateLinks: () => Promise<void>;
};

const saveDomain = async (domain: string, id: IDomain["id"] | null = null) => {
  const value = normalizeDomain(domain);
  const error = validateDomain(value);
  if (error) {
    toast.error(error);
    return false;
  }
  try {
    await instance.post("/api/domain", { domain: value, id });
    toast.success(id ? "Domain updated" : "Domain added");
    return true;
  } catch (err) {
    toast.error(getErrorMessage(err));
    return false;
  }
};

function DomainRow({
  domain,
  linkCount,
  onSaved,
  onDelete,
}: {
  domain: IDomain;
  linkCount: number;
  onSaved: () => void;
  onDelete: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(domain.domain);
  const [saving, setSaving] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const ok = await saveDomain(value, domain.id);
    setSaving(false);
    if (ok) {
      setEditing(false);
      onSaved();
    }
  };

  if (editing) {
    return (
      <li className="px-4 py-3">
        <form onSubmit={submit} className="flex gap-2">
          <input
            className="input input-bordered input-sm flex-1"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
            onKeyDown={(e) => e.key === "Escape" && setEditing(false)}
          />
          <button type="submit" className="btn btn-primary btn-sm btn-square" disabled={saving} aria-label="Save">
            {saving ? <span className="loading loading-spinner loading-xs" /> : <HiCheck className="h-4 w-4" />}
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm btn-square"
            onClick={() => {
              setValue(domain.domain);
              setEditing(false);
            }}
            aria-label="Cancel"
          >
            <HiXMark className="h-4 w-4" />
          </button>
        </form>
      </li>
    );
  }

  return (
    <li className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-base-content/5">
      <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-base-300 text-base-content/60 sm:flex">
        <HiOutlineGlobeAlt className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <a
          href={`https://${getHost(domain)}`}
          target="_blank"
          rel="noreferrer"
          className="block truncate font-medium hover:text-primary hover:underline"
        >
          {getHost(domain)}
        </a>
        <p className="text-sm text-base-content/50">
          {linkCount} {linkCount === 1 ? "link" : "links"}
        </p>
      </div>
      <button
        className="btn btn-ghost btn-sm btn-square"
        onClick={() => {
          setValue(domain.domain);
          setEditing(true);
        }}
        title="Edit"
        aria-label="Edit domain"
        data-testid={`edit-domain-${getHost(domain)}`}
      >
        <HiOutlinePencilSquare className="h-5 w-5" />
      </button>
      <button
        className="btn btn-ghost btn-sm btn-square text-error/80 hover:bg-error/10 hover:text-error"
        onClick={onDelete}
        title="Delete"
        aria-label="Delete domain"
        data-testid={`delete-domain-${getHost(domain)}`}
      >
        <HiOutlineTrash className="h-5 w-5" />
      </button>
    </li>
  );
}

function DomainsPanel({ domains, links, loading, error, revalidate, revalidateLinks }: Props) {
  const [newDomain, setNewDomain] = useState("");
  const [adding, setAdding] = useState(false);
  const [toDelete, setToDelete] = useState<IDomain | null>(null);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    const ok = await saveDomain(newDomain);
    setAdding(false);
    if (ok) {
      setNewDomain("");
      revalidate();
    }
  };

  const remove = async (domain: IDomain) => {
    try {
      await instance.delete("/api/domain", { params: { id: domain.id } });
      toast.success("Domain removed");
      setToDelete(null);
      await Promise.all([revalidate(), revalidateLinks()]);
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  };

  const countFor = (domain: IDomain) => links.filter((l) => sameId(l.domain_id, domain.id)).length;
  const deleteCount = toDelete ? countFor(toDelete) : 0;

  return (
    <section className="flex flex-col gap-4">
      <form onSubmit={add} className="flex gap-2">
        <label className="input input-bordered flex h-10 flex-1 items-center gap-2">
          <HiOutlineGlobeAlt className="h-4 w-4 shrink-0 text-base-content/50" />
          <input
            className="min-w-0 grow bg-transparent text-sm"
            placeholder="go.example.com"
            value={newDomain}
            onChange={(e) => setNewDomain(e.target.value)}
            spellCheck={false}
            autoCapitalize="off"
            data-testid="domain-input"
          />
        </label>
        <button
          type="submit"
          className="btn btn-primary btn-sm h-10 min-h-10 sm:px-4"
          disabled={adding || !newDomain.trim()}
          data-testid="create-domain"
        >
          {adding ? <span className="loading loading-spinner loading-xs" /> : <HiPlus className="h-4 w-4" />}
          Add domain
        </button>
      </form>

      <div className="overflow-hidden rounded-xl border border-base-content/10 bg-base-100">
        <div className="border-b border-base-content/10 px-4 py-2 text-xs text-base-content/50">
          {(domains?.length ?? 0) + 1} domains · {getHost(null)} is always available
        </div>
        {loading && !domains ? (
          <ListSkeleton rows={2} />
        ) : error && !domains ? (
          <EmptyState
            icon={<HiOutlineGlobeAlt className="h-6 w-6" />}
            title="Couldn't load your domains"
            description={error}
            action={
              <button className="btn btn-sm" onClick={revalidate}>
                Try again
              </button>
            }
          />
        ) : !domains?.length ? (
          <EmptyState
            icon={<HiOutlineGlobeAlt className="h-6 w-6" />}
            title="No custom domains"
            description="Links use this deployment's domain by default. Add your own domain to brand your links."
          />
        ) : (
          <ul className="divide-y divide-base-content/10">
            {domains.map((domain) => (
              <DomainRow
                key={domain.id}
                domain={domain}
                linkCount={countFor(domain)}
                onSaved={revalidate}
                onDelete={() => setToDelete(domain)}
              />
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-3 rounded-xl border border-base-content/10 bg-base-100 p-4 text-sm text-base-content/70">
        <HiOutlineInformationCircle className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
        <p>
          Before adding a domain here, point it at this deployment: add it under{" "}
          <span className="font-medium text-base-content">Vercel → Project → Settings → Domains</span> and set the DNS
          records Vercel shows you.{" "}
          <a
            className="link link-primary"
            href="https://vercel.com/docs/projects/domains/add-a-domain"
            target="_blank"
            rel="noreferrer"
          >
            Learn how
          </a>
        </p>
      </div>

      <ConfirmDialog
        open={!!toDelete}
        title="Remove this domain?"
        confirmLabel="Remove"
        description={
          toDelete && (
            <>
              <span className="font-medium text-base-content">{getHost(toDelete)}</span> will be removed.{" "}
              {deleteCount > 0
                ? `Its ${deleteCount} ${deleteCount === 1 ? "link moves" : "links move"} to ${getHost(null)}.`
                : "No links use it."}
            </>
          )
        }
        onConfirm={() => (toDelete ? remove(toDelete) : Promise.resolve())}
        onClose={() => setToDelete(null)}
      />
    </section>
  );
}

export default DomainsPanel;
