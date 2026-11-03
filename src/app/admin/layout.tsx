import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pepper · Dashboard",
  description: "Manage your short links and custom domains",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-base-200">{children}</div>;
}
