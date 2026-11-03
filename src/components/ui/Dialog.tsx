"use client";

import React, { useEffect, useRef } from "react";
import { HiXMark } from "react-icons/hi2";

type Props = {
  open: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  testId?: string;
};

/** Native <dialog> styled with daisyUI, driven by the `open` prop. */
function Dialog({ open, onClose, title, description, children, footer, className = "", testId }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="modal modal-bottom sm:modal-middle"
      onClose={onClose}
      data-testid={testId}
    >
      <div className={`modal-box border border-base-content/10 p-0 ${className}`}>
        <div className="flex items-start justify-between gap-4 px-6 pt-5">
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="mt-1 text-sm text-base-content/60">{description}</p>
            )}
          </div>
          <button
            type="button"
            className="btn btn-circle btn-ghost btn-sm -mr-2"
            onClick={onClose}
            aria-label="Close"
          >
            <HiXMark className="h-5 w-5" />
          </button>
        </div>
        {open && <div className="px-6 py-4">{children}</div>}
        {footer && (
          <div className="flex justify-end gap-2 border-t border-base-content/10 bg-base-200/40 px-6 py-3">
            {footer}
          </div>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button aria-label="Close">close</button>
      </form>
    </dialog>
  );
}

export default Dialog;
