import Button from "@/components/UI/Button";
import { closeModal } from "@/utils/app/modalHelpers";
import React from "react";

function DeleteDomains({
  modalID,
  onConfirm,
}: {
  modalID: string;
  onConfirm: () => Promise<void>;
}) {
  const close = () => {
    closeModal(`delete-domain-${modalID}`);
  };

  const save = async () => {
    await onConfirm();
    close();
  };

  return (
    <React.Fragment>
      <dialog id={`delete-domain-${modalID}`} className="modal">
        <div className="modal-box text-black">
          <h3 className="font-bold text-lg">
            Are you sure you want to delete?
          </h3>
          <p className="py-4">
            Deleting the domain will delete all the domains
          </p>
          <div className="flex justify-end gap-4">
            <Button className="btn btn-primary" onClick={save}>
              Save
            </Button>
            <button className="btn" onClick={close}>
              close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </React.Fragment>
  );
}

export default DeleteDomains;
