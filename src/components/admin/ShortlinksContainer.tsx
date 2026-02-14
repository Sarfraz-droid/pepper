"use client";

import React from "react";
import AdminMenu from "./ShortLink";
import { Shortlink } from "@/types/shortlink.types";
import { instance } from "@/utils/app/axiosInstance";
import Button from "../UI/Button";
import { AdminTabs } from "@/types/admin";
import useFetch from "@/hooks/useFetch";
import Loader from "../Loader";
import { IDomain } from "@/types/domain.types";

export const AdminContext = React.createContext({
  data: [],
  domains: [],
  revalidate: () => undefined,
  revalidateDomains: () => undefined,
} as {
  data: Shortlink[];
  domains: IDomain[];
  revalidate: () => any;
  revalidateDomains: () => any;
});

function ShortlinksContainer() {
  const [{ data, loading }, { revalidate }] = useFetch<Shortlink>(`/api/db`);

  const [
    { data: domains, loading: domainLoading },
    { revalidate: revalidateDomains },
  ] = useFetch<IDomain>("/api/domain");

  const createShortlink = async () => {
    await instance.post(
      `/api/db`,
      {
        shortlink: window.crypto.randomUUID(),
        longlink: "https://google.com",
        domain_id: null,
      },
      {
        withCredentials: true,
      }
    );

    revalidate();
  };

  if (data == null || domains == null || domainLoading || loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <AdminContext.Provider
        value={{
          data,
          revalidate,
          domains,
          revalidateDomains,
        }}
      >
        <div className="bg-card border border-border p-2 rounded-md mt-4 w-full md:w-1/2">
          <div className="flex justify-center items-center gap-4">
            <input
              className="input w-full hidden text-xs md:text-base h-8 md:h-full bg-background text-foreground"
              type="text"
              placeholder="Search for a shortlink"
            />
            <Button
              className="text-xs w-full self-center h-10 font-semibold rounded-md"
              onClick={createShortlink}
              loader
              data-testid="create-shortlink"
            >
              + Create Shortlink
            </Button>
          </div>
          <div className="border border-border mt-4" />
          <AdminMenu />
        </div>
      </AdminContext.Provider>
    </React.Fragment>
  );
}

export default ShortlinksContainer;
