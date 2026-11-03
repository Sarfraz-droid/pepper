import Link from "next/link";
import React from "react";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";

export const metadata = { title: "Link not found · Pepper" };

function InvalidLink() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center">
      <div className="rounded-full bg-primary/10 p-4 text-primary">
        <HiOutlineExclamationTriangle className="h-8 w-8" />
      </div>
      <h1 className="text-2xl font-semibold">This link doesn&apos;t exist</h1>
      <p className="max-w-sm text-base-content/60">
        The short link you followed may have been removed, or it was typed incorrectly.
      </p>
      <Link href="/" className="btn btn-ghost btn-sm mt-2">
        Go home
      </Link>
    </main>
  );
}

export default InvalidLink;
