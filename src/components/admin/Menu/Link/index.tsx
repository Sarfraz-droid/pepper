"use client";

import { useHover } from "@uidotdev/usehooks";
import React, { Fragment, useContext, useState } from "react";
import toast from "react-hot-toast";
import EditModal from "./Editor";
import { AnimatePresence } from "framer-motion";
import { Shortlink } from "@/types/shortlink.types";
import { AdminContext } from "../..";
import {
  AiFillDelete,
  AiOutlineCopy,
  AiOutlineDelete,
  AiOutlineEdit,
} from "react-icons/ai";
import { BiDotsVertical } from "react-icons/bi";
import { Menu, Transition } from "@headlessui/react";
import DeleteModal from "./Delete";
import { instance } from "@/utils/app/axiosInstance";

function LinkCard({ item }: { item: Shortlink }) {
  const [ref, hovering] = useHover();

  const { modalID, updateModalID, revalidate } = useContext(AdminContext);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const copyToClipboard = () => {
    console.log("copying");
    navigator.clipboard.writeText(
      `${window.location.origin}/${item.shortlink}`
    );
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
    await instance.delete(`${window.location.origin}/api/db`, {
      params: {
        id: item.id,
      },
    });

    console.log("deleted");
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
      <div className="flex flex-col w-full justify-start items-start flex-1">
        <div className="flex gap-2">
          <div
            className={`text-md pl-2 py-1 w-52 md:w-80 text-ellipsis transition-all whitespace-nowrap overflow-hidden`}
          >
            <a href={`${window.location.origin}/${item.shortlink}`}>
              {item.shortlink}
            </a>
          </div>
        </div>
        <div className="text-xs flex pl-3">
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
            {item.longlink}
          </a>
        </div>
      </div>
      <div
        className="flex gap-2"
        style={{
          // opacity: hovering ? 1 : 0,
          transition: "all 0.2s",
          // pointerEvents: hovering ? "all" : "none",
        }}
      >
        <button
          className="btn dark:bg-gray-300/30 dark:text-black w-9 h-9 flex flex-col justify-center items-center rounded-none dark:hover:bg-slate-400/40"
          data-tooltip="Edit"
          onClick={() => updateModalID(item.id)}
        >
          <AiOutlineEdit />
        </button>

        <button
          className="btn dark:bg-gray-300/30 dark:text-black w-9 h-9 flex flex-col justify-center items-center rounded-none dark:hover:bg-slate-400/40"
          onClick={copyToClipboard}
        >
          <AiOutlineCopy />
        </button>
        <button
          className="btn dark:bg-red-300/30 dark:text-black w-9 h-9 flex flex-col justify-center items-center rounded-none dark:hover:bg-red-400/40"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <AiFillDelete className="text-red-500 w-5 h-5" />
        </button>
      </div>
      <AnimatePresence>
        {modalID === item.id && (
          <EditModal
            state={modalID}
            item={item}
            onClose={() => updateModalID(-1)}
          />
        )}

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
