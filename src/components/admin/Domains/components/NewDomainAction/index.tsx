import Button from "@/components/UI/Button";
import React, { useRef, useState } from "react";
import EditDomainModal from "../Modal/EditDomain";
import { instance } from "@/utils/app/axiosInstance";

type IProps = {
  revalidate: () => void;
};

function NewDomainAction(props: IProps) {
  const createNewDomain = async (domain: string) => {
    try {
      await instance.post("/api/domain", { domain });

      props.revalidate();
    } catch (err) {
      console.error(err);
    }
  };

  const showDomainModal = () => {
    (
      document.getElementById("edit-modal-new-domain") as HTMLDialogElement
    ).showModal();
  };

  return (
    <React.Fragment>
      <Button
        className="btn text-xs bg-purple-600 w-full self-center h-10 font-semibold hover:bg-purple-700 rounded-md text-white"
        onClick={showDomainModal}
        loader
        data-testid="create-shortlink"
      >
        + Add New Domain
      </Button>
      <EditDomainModal
        item={{
          domain: "",
          id: "new-domain",
        }}
        onSave={createNewDomain}
      />
    </React.Fragment>
  );
}

export default NewDomainAction;
