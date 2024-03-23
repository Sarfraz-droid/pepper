"use client";

import { useHover, useMediaQuery } from "@uidotdev/usehooks";
import React, { Fragment, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import EditModal from "./Editor";
import { AnimatePresence } from "framer-motion";
import { Shortlink } from "@/types/shortlink.types";
import {
  AiFillDelete,
  AiOutlineCopy,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import DeleteModal from "./Delete";
import { instance } from "@/utils/app/axiosInstance";
import _ from "lodash";
import { AdminContext } from "../../ShortlinksContainer";
import { findHostDomain } from "@/utils/app/shortlinkHelpers";
import { openModal } from "@/utils/app/modalHelpers";

function LinkCard({ item }: { item: Shortlink }) {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");

  const [ref] = useHover();

  const { revalidate } = useContext(AdminContext);

  const { domains } = useContext(AdminContext);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const host = useMemo(() => findHostDomain(domains, item), [domains]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${host.domain}/${item.shortlink}`);
    toast.success("Copied to clipboard", {
      icon: "📋",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const deleteLink = async () => {
    await instance.delete(`/api/db`, {
      params: {
        id: item.id,
      },
    });

    toast.success("Successfully deleted Shortlink", {
      icon: "🗑️",
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
    setIsDeleteModalOpen(false);
    revalidate();
  };

  return (
    <div
      className="flex justify-between items-center p-2  text-black rounded-md hover:bg-black/10  transition-all cursor-pointer hover:-translate-y-1 z-0"
      ref={ref as any}
    >
      <div className="flex flex-col w-1/2 justify-start items-start flex-1">
        <div className="flex gap-2">
          <div
            className={`text-md pl-2 py-1 w-52 md:w-80 text-ellipsis transition-all whitespace-nowrap overflow-hidden`}
          >
            <a href={`${window.location.origin}/${item.shortlink}`}>
              {host?.domain}
              {"/"}
              {item.shortlink}
            </a>
          </div>
        </div>
        <div className="text-xs justify-start items-start w-1/ flex pl-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3 rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          <a
            href={item.longlink}
            className="pl-1 italic underline underline-offset-1 hover:underline-offset-4 hover:-translate-y-1 opacity-75 transition-all"
          >
            {_.truncate(item.longlink, {
              length: isSmallDevice ? 20 : 50,
            })}
          </a>
        </div>
      </div>
      <div
        className="flex gap-2"
        style={{
          transition: "all 0.2s",
        }}
      >
        <button
          className="btn btn-ghost p-0 bg-gray-400/30 hover:bg-gray-300/80 rounded-lg w-9 h-9 flex flex-col justify-center items-center"
          data-tooltip="Edit"
          onClick={() => openModal(`modal-${item.id}`)}
          data-testid={`edit-${item.shortlink}`}
        >
          <AiOutlineEdit />
        </button>

        <button
          className="btn btn-ghost p-0 bg-gray-400/30 hover:bg-gray-300/80 rounded-lg w-9 h-9 flex flex-col justify-center items-center"
          onClick={copyToClipboard}
          data-testid={`copy-${item.shortlink}`}
        >
          <AiOutlineCopy />
        </button>
        <button
          className="btn btn-ghost p-0 bg-red-300/20 hover:bg-red-300/70 rounded-lg w-9 h-9 flex flex-col justify-center items-center"
          onClick={() => setIsDeleteModalOpen(true)}
          data-testid={`delete-${item.shortlink}`}
        >
          <AiFillDelete className="text-red-500 w-5 h-5" />
        </button>
      </div>
      <AnimatePresence>
        <EditModal item={item} />

        {isDeleteModalOpen && (
          <DeleteModal
            onClose={() => setIsDeleteModalOpen(false)}
            onDelete={deleteLink}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default LinkCard;
