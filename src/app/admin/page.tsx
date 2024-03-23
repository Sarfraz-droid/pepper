"use client";
import ErrorHandler from "@/components/Error";
import Loader from "@/components/Loader";
import AdminContainer from "@/components/admin";
import TabButton from "@/components/admin/TabButton";
import { AdminTabs } from "@/types/admin";
import { instance } from "@/utils/app/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AiFillGithub } from "react-icons/ai";

function AdminPage() {
  const [tabState, setTabState] = useState(AdminTabs.SHORT_LINKS);

  useEffect(() => {
    instance.defaults.withCredentials = true;
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.localStorage.getItem("token")}`;
  }, []);

  return (
    <div className="dark:text-white flex flex-col  items-center w-full">
      <div className="flex justify-center items-center gap-4">
        <Image
          src="/assets/logo2.png"
          className="p-2 bg-white rounded-full self-center"
          alt="Pepper"
          width={50}
          height={50}
        />
        <h1 className="flex gap-1 self-center font-semibold text-lg  dark:text-purple-500">
          Pepper <p className="text-white">Dashboard</p>
        </h1>
      </div>
      <div className="flex justify-between items-center mt-5 w-full md:w-1/2">
        <a
          className=" p-2 flex gap-2 justify-center items-center hover:bg-white rounded-md transition-all group"
          href={`https://github.com/Sarfraz-droid/pepper.git`}
        >
          <AiFillGithub className="w-5 h-5 group-hover:text-black" />
          <span className="group-hover:text-black transition-all">GitHub</span>
        </a>
        <TabButton setTabState={setTabState} tab={tabState} />
      </div>

      <AdminContainer tab={tabState} />
    </div>
  );
}

export default AdminPage;
