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
import { Button } from "@/components/ui/button";

function AdminPage() {
  const [tabState, setTabState] = useState(AdminTabs.SHORT_LINKS);

  useEffect(() => {
    instance.defaults.withCredentials = true;
    instance.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${window.localStorage.getItem("token")}`;
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center w-full p-4">
      <div className="flex justify-center items-center gap-4 mb-6">
        <Image
          src="/assets/logo2.png"
          className="p-2 bg-white rounded-full self-center"
          alt="Pepper"
          width={50}
          height={50}
        />
        <h1 className="flex gap-1 self-center font-semibold text-lg">
          <span className="text-primary">Pepper</span> <span>Dashboard</span>
        </h1>
      </div>
      <div className="flex justify-between items-center mt-5 w-full md:w-1/2">
        <a
          href={`https://github.com/Sarfraz-droid/pepper.git`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="ghost" className="flex gap-2">
            <AiFillGithub className="w-5 h-5" />
            <span>GitHub</span>
          </Button>
        </a>
        <TabButton setTabState={setTabState} tab={tabState} />
      </div>

      <AdminContainer tab={tabState} />
    </div>
  );
}

export default AdminPage;
