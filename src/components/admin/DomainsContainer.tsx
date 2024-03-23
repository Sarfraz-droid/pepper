import React from "react";
import Button from "../UI/Button";
import useFetch from "@/hooks/useFetch";
import { IDomain } from "@/types/domain.types";
import DomainCard from "./Domains/components/LinkCard";
import NewDomainAction from "./Domains/components/NewDomainAction";

function DomainsContainer() {
  const [{ data }, { revalidate }] = useFetch<IDomain>("/api/domain");

  return (
    <React.Fragment>
      <div className="bg-white p-2 rounded-md mt-4 w-full md:w-1/2">
        <NewDomainAction revalidate={revalidate} />
        {data?.map((item, index) => (
          <DomainCard key={index} data={item} revalidate={revalidate} />
        ))}
      </div>
    </React.Fragment>
  );
}

export default DomainsContainer;
