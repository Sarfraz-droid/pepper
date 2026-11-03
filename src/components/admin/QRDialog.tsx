"use client";

import React, { useEffect, useRef, useState } from "react";
import type QRCodeStyling from "qr-code-styling";
import type { DotType, Options } from "qr-code-styling";
import { HiArrowDownTray, HiOutlinePhoto, HiXMark } from "react-icons/hi2";
import Dialog from "@/components/ui/Dialog";
import { prettyUrl } from "@/utils/app/shortlinkHelpers";

type Props = {
  open: boolean;
  url: string;
  name: string;
  onClose: () => void;
};

const DOT_STYLES: DotType[] = ["square", "rounded", "dots", "classy", "classy-rounded", "extra-rounded"];

function QRDialog({ open, url, name, onClose }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const qr = useRef<QRCodeStyling | null>(null);
  const [style, setStyle] = useState<DotType>("rounded");
  const [color, setColor] = useState("#111111");
  const [background, setBackground] = useState("#ffffff");
  const [logo, setLogo] = useState<string | undefined>();

  const options: Partial<Options> = {
    width: 240,
    height: 240,
    margin: 8,
    type: "canvas",
    data: url,
    image: logo,
    dotsOptions: { type: style, color },
    cornersSquareOptions: { color },
    backgroundOptions: { color: background },
    imageOptions: { margin: 4, crossOrigin: "anonymous" },
    qrOptions: { errorCorrectionLevel: logo ? "H" : "M" },
  };

  // qr-code-styling needs the DOM, so it is loaded only in the browser.
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    import("qr-code-styling").then(({ default: QR }) => {
      if (cancelled || !container.current) return;
      if (!qr.current) qr.current = new QR(options);
      else qr.current.update(options);
      container.current.innerHTML = "";
      qr.current.append(container.current);
    });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, url, style, color, background, logo]);

  const download = (extension: "png" | "svg") => {
    import("qr-code-styling").then(({ default: QR }) => {
      new QR({ ...options, width: 1024, height: 1024, margin: 24, type: extension === "svg" ? "svg" : "canvas" }).download({
        name: `qr-${name}`,
        extension,
      });
    });
  };

  const onLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="QR code"
      description={<span className="break-all">{prettyUrl(url)}</span>}
      className="max-w-2xl"
      footer={
        <>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => download("svg")}>
            <HiArrowDownTray className="h-4 w-4" /> SVG
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={() => download("png")}>
            <HiArrowDownTray className="h-4 w-4" /> PNG
          </button>
        </>
      }
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <div
          ref={container}
          className="flex h-[256px] w-[256px] shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 [&>canvas]:h-full [&>canvas]:w-full"
        >
          <span className="loading loading-spinner text-primary" />
        </div>
        <div className="flex w-full flex-col gap-3">
          <label className="form-control">
            <div className="label py-1">
              <span className="label-text text-sm">Style</span>
            </div>
            <select
              className="select select-bordered select-sm"
              value={style}
              onChange={(e) => setStyle(e.target.value as DotType)}
            >
              {DOT_STYLES.map((s) => (
                <option key={s} value={s}>
                  {s.replace("-", " ")}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="form-control">
              <div className="label py-1">
                <span className="label-text text-sm">Color</span>
              </div>
              <input
                type="color"
                className="h-8 w-full cursor-pointer rounded-lg border border-base-content/20 bg-transparent"
                value={color}
                onChange={(e) => setColor(e.target.value)}
              />
            </label>
            <label className="form-control">
              <div className="label py-1">
                <span className="label-text text-sm">Background</span>
              </div>
              <input
                type="color"
                className="h-8 w-full cursor-pointer rounded-lg border border-base-content/20 bg-transparent"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
              />
            </label>
          </div>
          <div className="form-control">
            <div className="label py-1">
              <span className="label-text text-sm">Center logo</span>
            </div>
            <div className="flex gap-2">
              <label className="btn btn-outline btn-sm flex-1 border-base-content/20">
                <HiOutlinePhoto className="h-4 w-4" />
                {logo ? "Change image" : "Upload image"}
                <input type="file" accept="image/*" className="hidden" onChange={onLogo} />
              </label>
              {logo && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm btn-square"
                  onClick={() => setLogo(undefined)}
                  aria-label="Remove logo"
                >
                  <HiXMark className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

export default QRDialog;
