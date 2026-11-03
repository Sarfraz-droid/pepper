"use client";

import React, { useState } from "react";
import Dialog from "./Dialog";

type Props = {
  open: boolean;
  title: string;
  description: React.ReactNode;
  confirmLabel?: string;
  onConfirm: () => Promise<unknown>;
  onClose: () => void;
};

function ConfirmDialog({ open, title, description, confirmLabel = "Delete", onConfirm, onClose }: Props) {
  const [busy, setBusy] = useState(false);

  const confirm = async () => {
    setBusy(true);
    try {
      await onConfirm();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={title}
      className="max-w-md"
      footer={
        <>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={onClose}
            data-testid="cancel-delete-link"
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-error btn-sm"
            onClick={confirm}
            disabled={busy}
            data-testid="confirm-delete-link"
          >
            {busy && <span className="loading loading-spinner loading-xs" />}
            {confirmLabel}
          </button>
        </>
      }
    >
      <p className="text-sm text-base-content/70">{description}</p>
    </Dialog>
  );
}

export default ConfirmDialog;
