"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import DomainsPanel from "@/components/admin/DomainsPanel";
import LinksPanel from "@/components/admin/LinksPanel";
import useFetch from "@/hooks/useFetch";
import { AdminTabs } from "@/types/admin";
import { IDomain } from "@/types/domain.types";
import { Shortlink } from "@/types/shortlink.types";
import { clearSession } from "@/utils/app/axiosInstance";

const TAB_KEY = "pepper:tab";

function AdminPage() {
  const [tab, setTab] = useState(AdminTabs.SHORT_LINKS);
  const [links, { revalidate: revalidateLinks }] = useFetch<Shortlink>("/api/db");
  const [domains, { revalidate: revalidateDomains }] = useFetch<IDomain>("/api/domain");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(TAB_KEY);
      if (saved === AdminTabs.DOMAINS) setTab(AdminTabs.DOMAINS);
    } catch {}
  }, []);

  const changeTab = (next: AdminTabs) => {
    setTab(next);
    try {
      window.localStorage.setItem(TAB_KEY, next);
    } catch {}
  };

  const logout = () => {
    clearSession();
    window.location.href = "/admin/login";
  };

  const tabs = [
    { id: AdminTabs.SHORT_LINKS, label: "Links", count: links.data?.length },
    { id: AdminTabs.DOMAINS, label: "Domains", count: domains.data?.length },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 border-b border-base-content/10 bg-base-200/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-4xl items-center gap-3 px-4">
          <div className="flex items-center gap-2">
            <Image src="/assets/logo2.png" alt="" width={28} height={28} className="rounded-full bg-white p-0.5" />
            <span className="font-semibold">Pepper</span>
          </div>
          <div className="flex-1" />
          <a
            href="https://github.com/Sarfraz-droid/pepper"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost btn-sm btn-square"
            aria-label="GitHub"
            title="GitHub"
          >
            <AiFillGithub className="h-5 w-5" />
          </a>
          <button className="btn btn-ghost btn-sm" onClick={logout} data-testid="logout">
            <HiArrowRightOnRectangle className="h-4 w-4" />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-5 px-4 py-6">
        <div role="tablist" className="tabs tabs-boxed w-fit bg-base-100">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={`tab gap-2 ${tab === t.id ? "tab-active" : ""}`}
              onClick={() => changeTab(t.id)}
              data-testid={`tab-${t.label.toLowerCase()}`}
            >
              {t.label}
              {t.count != null && (
                <span className={`badge badge-sm ${tab === t.id ? "badge-ghost" : "bg-base-300"}`}>{t.count}</span>
              )}
            </button>
          ))}
        </div>

        {tab === AdminTabs.SHORT_LINKS ? (
          <LinksPanel
            links={links.data}
            domains={domains.data ?? []}
            loading={links.loading || domains.loading}
            error={links.error}
            revalidate={revalidateLinks}
          />
        ) : (
          <DomainsPanel
            domains={domains.data}
            links={links.data ?? []}
            loading={domains.loading}
            error={domains.error}
            revalidate={revalidateDomains}
            revalidateLinks={revalidateLinks}
          />
        )}
      </main>
    </div>
  );
}

export default AdminPage;
