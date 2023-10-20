"use client";

import React from "react";
import AdminMenu from "./Menu";
import { Shortlink } from "@/types/shortlink.types";
import { instance } from "@/utils/app/axiosInstance";
import Button from "../UI/Button";

export const AdminContext = React.createContext({
  data: {},
  modalID: -1,
  updateModalID: (id: number) => undefined,
  revalidate: () => undefined,
} as {
  data: Shortlink[];
  modalID: number;
  updateModalID: (id: number) => void;
  revalidate: () => any;
});

function AdminContainer({
  data,
  revalidate,
}: {
  data: Shortlink[];
  revalidate: () => void;
}) {
  const [modalID, setModalID] = React.useState(-1);

  const updateModalID = (id: number) => {
    setModalID(id);
  };

  const createShortlink = async () => {
    const { data } = await instance.post(`http://localhost:3000/api/db`, {
      shortlink: window.crypto.randomUUID(),
      longlink: "https://google.com",
    });

    setModalID(data.id);
    revalidate();
  };

  return (
    <React.Fragment>
      <AdminContext.Provider
        value={{ data, modalID, updateModalID, revalidate }}
      >
        <div className="bg-white p-2 rounded-md mt-4 w-full md:w-1/2">
          <div className="flex justify-center items-center gap-4">
            <input
              className=" input w-full hidden text-xs md:text-base h-8 md:h-full dark:text-black"
              type="text"
              placeholder="Search for a shortlink"
            />
            <Button
              className="text-xs bg-purple-600 w-full self-center h-8 rounded-md text-white"
              onClick={createShortlink}
              loader
            >
              + Create Shortlink
            </Button>
          </div>
          <div className="border border-black/10 mt-4" />
          <AdminMenu />
        </div>
      </AdminContext.Provider>
    </React.Fragment>
  );
}

export default AdminContainer;
