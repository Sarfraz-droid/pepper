import { useElementPosition } from "@/hooks/useElementPosition";
import React, { useContext, useMemo } from "react";
import { createPortal } from "react-dom";
import QRCodeComponent from "./QRCode/QRCodeGenerator";
import { motion } from "framer-motion";
import Modal from "@/components/UI/Modal";
import { Shortlink } from "@/types/shortlink.types";
import { createContext } from "vm";
import { instance } from "@/utils/app/axiosInstance";
import toast from "react-hot-toast";
import Button from "@/components/UI/Button";
import { AdminContext } from "@/components/admin/ShortlinksContainer";
import { findHostDomain } from "@/utils/app/shortlinkHelpers";
import { isString } from "lodash";
import { IDomain } from "@/types/domain.types";
import { closeModal } from "@/utils/app/modalHelpers";

function EditModal({ item }: { item: Shortlink }) {
  const [_, ref] = useElementPosition();

  const [formData, setFormData] = React.useState(item);

  const { revalidate, domains } = useContext(AdminContext);

  const host = useMemo(() => {
    return findHostDomain(domains, formData);
  }, [domains, formData]);

  const updateFormData = (key: string) => {
    return (e: any) => {
      setFormData({
        ...formData,
        [key]: e?.target?.value,
      });
    };
  };

  const updateDomain = (domain: IDomain) => {
    setFormData({
      ...formData,
      domain_id: domain.id,
    });
  };

  const saveData = async () => {
    const { data } = await instance.post(`/api/db`, {
      ...formData,
      id: item.id,
    });

    if (data.success) {
      toast.success(`Successfully updated Shortlink - ${data.id}`);
      revalidate();
    } else {
      toast.error("There has been an error saving the document");
    }
  };

  const modalID = `modal-${item.id}`;

  const onClose = () => {
    closeModal(modalID);
  };

  return createPortal(
    <dialog id={modalID} className="modal">
      <div className="modal-box max-w-4xl">
        <div
          className="flex justify-between items-end p-2 h-[8%]"
          key={item.id}
        >
          <button
            className="p-1 dark:bg-white rounded-full hover:bg-black/10 transition-all mt-2"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-black/40"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="w-full overflow-auto flex flex-col md:p-9 h-[80%] gap-6 flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:w-full justify-evenly">
              <div className="mb-1 flex gap-4 font-semibold text-gray-800">
                Shortlink
              </div>
              <div className="flex items-center md:gap-2 w-full">
                <p className="text-xs text-right self-center ">
                  <div className="dropdown">
                    <div
                      tabIndex={0}
                      className="m-1 btn btn-sm text-primary bg-primary/20"
                    >
                      {host.domain}
                    </div>
                    <ul
                      tabIndex={0}
                      className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52"
                    >
                      {domains.map((item) => (
                        <li
                          className="p-2 text-start btn btn-sm btn-ghost font-normal text-xs"
                          onClick={() => updateDomain(item)}
                        >
                          {item.domain}
                        </li>
                      ))}
                    </ul>
                  </div>
                </p>
                <p>/</p>
                <input
                  className="input input-ghost input-sm w-full bg-black/10"
                  value={formData.shortlink}
                  onChange={updateFormData("shortlink")}
                  data-testid="shortlink-input"
                />
              </div>
            </div>
            <div className="flex flex-col md:w-full justify-evenly">
              <div className="mb-1 flex gap-4 font-semibold text-gray-800">
                Long URL
              </div>
              <textarea
                className="textarea bg-black/10 resize-none"
                value={formData.longlink}
                onChange={updateFormData("longlink")}
                rows={5}
                data-testid="longlink-input"
              />
            </div>
          </div>
          <QRCodeComponent item={formData} />
        </div>
        <div className="p-2 h-[12%] border-t border-black/10 flex gap-2 justify-end items-end">
          <Button
            className="btn btn-primary"
            loader
            onClick={saveData}
            data-testid="save-shortlink"
          >
            Save
          </Button>
          <button
            className="btn btn-ghost text-black"
            onClick={onClose}
            data-testid="cancel-shortlink"
          >
            Cancel
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>,
    document.body
  );
}

export default EditModal;
