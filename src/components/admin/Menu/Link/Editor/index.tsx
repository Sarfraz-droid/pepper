import { useElementPosition } from "@/hooks/useElementPosition";
import React, { useContext } from "react";
import { createPortal } from "react-dom";
import QRCodeComponent from "./QRCode/QRCodeGenerator";
import { motion } from "framer-motion";
import Modal from "@/components/UI/Modal";
import { Shortlink } from "@/types/shortlink.types";
import { createContext } from "vm";
import { instance } from "@/utils/app/axiosInstance";
import toast from "react-hot-toast";
import Button from "@/components/UI/Button";
import { AdminContext } from "@/components/admin";


function EditModal({
  onClose,
  state,
  item,
}: {
  onClose: () => void;
  state: number;
  item: Shortlink;
}) {
  const [_, ref] = useElementPosition();

  const [formData, setFormData] = React.useState(item);

  const {revalidate} = useContext(AdminContext)

  const updateFormData = (key: string) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
        ...formData,
        [key]: e.target.value,
      });
    };
  };

  const saveData = async () => {
    const {data} = await instance.post(`/api/db`, {
      ...formData,
      id: item.id
    })


    if(data.success) {
      toast.success(`Successfully updated Shortlink - ${data.id}`)
      onClose()
      revalidate()
    }else{
      toast.error('There has been an error saving the document')
    }

    
  }

  return createPortal(
    <Modal innerRef={ref as any} onBackgroundClick={onClose}
      className={{
        modal: "w-full h-full md:w-1/2 md:h-5/6"
      }}
    >
      <div className="flex justify-between items-end p-2 h-[8%]" key={state}>
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
      <div className="w-full h-[84%] overflow-auto flex flex-col items-center md:p-4">
        <div className="flex flex-col md:w-2/3 justify-evenly">
          <div className="mb-1 flex justify-center items-center gap-4 text-xs font-semibold text-gray-400">
            Shortlink
          </div>
          <div className="flex items-center justify-between md:gap-4 w-full">
            <p className="text-xs text-right self-center font-bold p-2 px-4 bg-purple-400/25 border-purple-500 text-purple-500 rounded-md">
              {window.location.origin}
            </p>
            <p>/</p>

            <input
              className="input dark:border-2  dark:bg-gray-400/40 dark:text-black/60 focus:border-black/60 focus:ring-0 dark:focus:bg-gray-200/10 font-semibold dark:border-transparent p-1 text-sm"
              value={formData.shortlink}
              onChange={updateFormData("shortlink")}
              data-testid="shortlink-input"
            />
            <div> </div>
          </div>
        </div>
        <div className="my-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 opacity-50"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3"
            />
          </svg>
        </div>
        <div className="flex flex-col w-full justify-center items-center">
          <div className="mb-1 flex justify-center items-center gap-4 text-xs font-semibold text-gray-400">
            Full link
          </div>
          <input
            className="input dark:border-2 w-5/6  dark:bg-gray-400/40 dark:text-black/60 focus:border-black/60 focus:ring-0 dark:focus:bg-gray-200/10 font-semibold dark:border-transparent p-1 text-sm md:w-4/6"
            value={formData.longlink}
            onChange={updateFormData("longlink")}
            data-testid="longlink-input"
          />
        </div>
        <div className="border mt-4 w-1/3 " />
        <QRCodeComponent 
          item={formData}
        />
      </div>
      <div className="p-2 h-[8%] border-t border-black/10 flex gap-2 justify-end items-end">
        <Button className="btn btn-small" loader
          onClick={saveData}
          data-testid="save-shortlink"
        >Save</Button>
        <button
          className="btn btn-small dark:bg-transparent
                dark:text-purple-600
                dark:hover:bg-purple-300/20 dark:font-bold"
          onClick={onClose}
          data-testid="cancel-shortlink"
        >
          Cancel
        </button>
      </div>
    </Modal>,
    document.body
  );
}

export default EditModal;
