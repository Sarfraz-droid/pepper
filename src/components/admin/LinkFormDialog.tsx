"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiArrowPath } from "react-icons/hi2";
import Dialog from "@/components/ui/Dialog";
import { IDomain } from "@/types/domain.types";
import { Shortlink } from "@/types/shortlink.types";
import { getErrorMessage, instance } from "@/utils/app/axiosInstance";
import { copyText, getHost, getShortUrl, sameId } from "@/utils/app/shortlinkHelpers";
import { normalizeUrl, randomSlug, validateSlug } from "@/utils/shared/links";

type Props = {
  open: boolean;
  /** The link being edited, or null to create one. */
  link: Shortlink | null;
  domains: IDomain[];
  onClose: () => void;
  onSaved: () => void;
};

type Form = { shortlink: string; longlink: string; domainId: string };

const toForm = (link: Shortlink | null): Form => ({
  shortlink: link?.shortlink ?? randomSlug(),
  longlink: link?.longlink ?? "",
  domainId: link?.domain_id != null ? String(link.domain_id) : "",
});

function LinkFormDialog({ open, link, domains, onClose, onSaved }: Props) {
  const [form, setForm] = useState<Form>(() => toForm(link));
  const [touched, setTouched] = useState(false);
  const [saving, setSaving] = useState(false);

  // Reset the form every time the dialog opens.
  useEffect(() => {
    if (open) {
      setForm(toForm(link));
      setTouched(false);
    }
  }, [open, link]);

  const domain = domains.find((d) => sameId(d.id, form.domainId)) ?? null;
  const slugError = validateSlug(form.shortlink.trim());
  const urlError = normalizeUrl(form.longlink) ? null : "Enter a valid URL, e.g. https://example.com";

  const set = (key: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (slugError || urlError) return;

    setSaving(true);
    try {
      const shortlink = form.shortlink.trim();
      await instance.post("/api/db", {
        id: link?.id ?? null,
        shortlink,
        longlink: form.longlink.trim(),
        domain_id: domain?.id ?? null,
      });
      if (link) {
        toast.success("Link updated");
      } else {
        const copied = await copyText(getShortUrl(domain, shortlink));
        toast.success(copied ? "Link created and copied" : "Link created");
      }
      onSaved();
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const formId = "link-form";

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={link ? "Edit link" : "New link"}
      description={link ? "Changes apply immediately to everyone using this link." : "Shorten a URL. The new link is copied to your clipboard."}
      className="max-w-xl"
      footer={
        <>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            data-testid="cancel-shortlink"
          >
            Cancel
          </button>
          <button
            type="submit"
            form={formId}
            className="btn btn-primary btn-sm"
            disabled={saving}
            data-testid="save-shortlink"
          >
            {saving && <span className="loading loading-spinner loading-xs" />}
            {link ? "Save changes" : "Create link"}
          </button>
        </>
      }
    >
      <form id={formId} onSubmit={submit} className="flex flex-col gap-4" noValidate>
        <label className="form-control">
          <div className="label">
            <span className="label-text font-medium">Destination URL</span>
          </div>
          <input
            className={`input input-bordered w-full ${touched && urlError ? "input-error" : ""}`}
            placeholder="https://example.com/a/very/long/url"
            value={form.longlink}
            onChange={set("longlink")}
            autoFocus
            inputMode="url"
            data-testid="longlink-input"
          />
          {touched && urlError && (
            <div className="label">
              <span className="label-text-alt text-error">{urlError}</span>
            </div>
          )}
        </label>

        <div className="form-control">
          <div className="label">
            <span className="label-text font-medium">Short link</span>
          </div>
          <div className="join w-full">
            <select
              className="join-item select select-bordered max-w-[50%] shrink"
              value={form.domainId}
              onChange={set("domainId")}
              aria-label="Domain"
              data-testid="domain-select"
            >
              <option value="">{getHost(null)}</option>
              {domains.map((d) => (
                <option key={d.id} value={String(d.id)}>
                  {getHost(d)}
                </option>
              ))}
            </select>
            <span className="join-item flex items-center border border-base-content/20 bg-base-200 px-2 text-base-content/50">
              /
            </span>
            <input
              className={`join-item input input-bordered min-w-0 flex-1 ${touched && slugError ? "input-error" : ""}`}
              value={form.shortlink}
              onChange={set("shortlink")}
              placeholder="my-link"
              spellCheck={false}
              autoCapitalize="off"
              data-testid="shortlink-input"
            />
            <button
              type="button"
              className="join-item btn btn-square border-base-content/20"
              onClick={() => setForm((prev) => ({ ...prev, shortlink: randomSlug() }))}
              title="Generate random path"
              aria-label="Generate random path"
            >
              <HiArrowPath className="h-4 w-4" />
            </button>
          </div>
          <div className="label">
            {touched && slugError ? (
              <span className="label-text-alt text-error">{slugError}</span>
            ) : (
              <span className="label-text-alt truncate text-base-content/50">
                {getShortUrl(domain, form.shortlink.trim() || "…")}
              </span>
            )}
          </div>
        </div>
      </form>
    </Dialog>
  );
}

export default LinkFormDialog;
