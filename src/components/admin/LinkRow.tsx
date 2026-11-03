"use client";

import React from "react";
import toast from "react-hot-toast";
import {
  HiArrowLongRight,
  HiOutlineClipboardDocument,
  HiOutlineLink,
  HiOutlinePencilSquare,
  HiOutlineQrCode,
  HiOutlineTrash,
} from "react-icons/hi2";
import { IDomain } from "@/types/domain.types";
import { Shortlink } from "@/types/shortlink.types";
import { copyText, getHost, getShortUrl, prettyUrl } from "@/utils/app/shortlinkHelpers";

type Props = {
  link: Shortlink;
  domain: IDomain | null;
  onEdit: () => void;
  onDelete: () => void;
  onQR: () => void;
};

function LinkRow({ link, domain, onEdit, onDelete, onQR }: Props) {
  const shortUrl = getShortUrl(domain, link.shortlink);

  const copy = async () => {
    const ok = await copyText(shortUrl);
    if (ok) toast.success("Copied to clipboard");
    else toast.error("Could not copy the link");
  };

  return (
    <li className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-base-content/5">
      <div className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary sm:flex">
        <HiOutlineLink className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex min-w-0 items-center gap-1">
          <a
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
            className="flex min-w-0 font-medium hover:text-primary hover:underline"
            title={shortUrl}
          >
            <span className="truncate text-base-content/50">{getHost(domain)}</span>
            <span className="max-w-[75%] shrink-0 truncate">
              <span className="text-base-content/50">/</span>
              {link.shortlink}
            </span>
          </a>
          <button
            className="btn btn-ghost btn-xs btn-square shrink-0 text-base-content/60"
            onClick={copy}
            title="Copy short link"
            aria-label="Copy short link"
            data-testid={`copy-${link.shortlink}`}
          >
            <HiOutlineClipboardDocument className="h-4 w-4" />
          </button>
        </div>
        <div className="flex min-w-0 items-center gap-1 text-sm text-base-content/50">
          <HiArrowLongRight className="h-3.5 w-3.5 shrink-0" />
          <a
            href={link.longlink}
            target="_blank"
            rel="noreferrer"
            className="truncate hover:text-base-content hover:underline"
            title={link.longlink}
          >
            {prettyUrl(link.longlink)}
          </a>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          className="btn btn-ghost btn-sm btn-square"
          onClick={onQR}
          title="QR code"
          aria-label="QR code"
          data-testid={`qr-${link.shortlink}`}
        >
          <HiOutlineQrCode className="h-5 w-5" />
        </button>
        <button
          className="btn btn-ghost btn-sm btn-square"
          onClick={onEdit}
          title="Edit"
          aria-label="Edit"
          data-testid={`edit-${link.shortlink}`}
        >
          <HiOutlinePencilSquare className="h-5 w-5" />
        </button>
        <button
          className="btn btn-ghost btn-sm btn-square text-error/80 hover:bg-error/10 hover:text-error"
          onClick={onDelete}
          title="Delete"
          aria-label="Delete"
          data-testid={`delete-${link.shortlink}`}
        >
          <HiOutlineTrash className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
}

export default LinkRow;
