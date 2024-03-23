import Button from "@/components/UI/Button";
import { IDomain } from "@/types/domain.types";
import React, { useState } from "react";

type IProps = {
  item: IDomain;
  onSave: (url: string) => Promise<void>;
};

function EditDomainModal(props: IProps) {
  const [domainText, setDomainText] = useState(props.item.domain);

  const modalID = `edit-modal-${props.item.id}`;

  const closeModal = () => {
    (document.getElementById(modalID) as HTMLDialogElement).close();
  };

  return (
    <React.Fragment>
      <dialog id={modalID} className="modal">
        <div className="modal-box text-black">
          <h3 className="font-bold text-lg">Edit Domain</h3>
          <p className="py-4">
            <input
              className="input bg-gray-300/40 w-full"
              value={domainText}
              onChange={(e) => {
                setDomainText(e.target.value);
              }}
            />
          </p>
          <div className="modal-action">
            <div className="flex gap-2 w-full">
              <a className="link link-primary self-center flex-1">
                How to integrate domains?
              </a>
              <Button
                className="btn btn-primary"
                onClick={async () => {
                  await props.onSave(domainText);
                  setDomainText("");
                  closeModal();
                }}
              >
                Save
              </Button>
              <button className="btn" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </React.Fragment>
  );
}

export default EditDomainModal;
