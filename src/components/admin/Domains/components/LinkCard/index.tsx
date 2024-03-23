import Button from "@/components/UI/Button";
import { IDomain } from "@/types/domain.types";
import _ from "lodash";
import React from "react";
import { AiFillDelete, AiFillEdit, AiOutlineEdit } from "react-icons/ai";
import EditDomainModal from "../Modal/EditDomain";
import { data } from "cypress/types/jquery";
import { instance } from "@/utils/app/axiosInstance";
import toast from "react-hot-toast";
import DeleteDomains from "../Modal/DeleteDomain";
import { openModal } from "@/utils/app/modalHelpers";

type IProps = {
  data: IDomain;
  revalidate: () => void;
};

function DomainCard(props: IProps) {
  const onSaveDomain = async (domain: string) => {
    try {
      await instance.post("/api/domain", {
        domain,
        id: props.data.id,
      });

      toast.success("Successfully deleted domains", {
        icon: "🗑️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });

      props.revalidate();
    } catch (err) {
      console.error(err);
    }
  };

  const onDelete = async () => {
    try {
      await instance.delete("/api/domain", {
        params: {
          id: props.data.id,
        },
      });

      props.revalidate();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <React.Fragment>
      <div className="flex justify-between items-center  text-black rounded-md hover:bg-black/10 transition-all cursor-pointer hover:-translate-y-1 z-0 my-2">
        <div className="flex flex-col justify-start items-start flex-1 gap-2">
          <div className="flex gap-2 w-full justify-center items-center">
            <div
              className={`text-md pl-8 w-52 md:w-80 text-ellipsis transition-all whitespace-nowrap overflow-hidden text-black`}
            >
              {props.data.domain}
            </div>
            <div className="flex justify-end items-end w-full  gap-2">
              <button
                className="btn btn-ghost my-2 bg-gray-400/30 hover:bg-gray-300/80 rounded-lg px-4 flex flex-col justify-center items-center"
                onClick={() => {
                  (
                    document.getElementById(
                      `edit-modal-${props.data.id}`
                    ) as HTMLDialogElement
                  )?.showModal();
                }}
              >
                <AiOutlineEdit />
              </button>
              <button
                className="btn btn-ghost my-2 mr-2 bg-red-300/20 hover:bg-red-300/70 rounded-lg px-4 flex flex-col justify-center items-center"
                onClick={() => openModal(`delete-domain-${props.data.id}`)}
              >
                <AiFillDelete className="text-red-500 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <EditDomainModal
        item={props.data}
        onSave={onSaveDomain}
        key={props.data.id}
      />

      <DeleteDomains modalID={props.data.id} onConfirm={onDelete} />
    </React.Fragment>
  );
}

export default DomainCard;
