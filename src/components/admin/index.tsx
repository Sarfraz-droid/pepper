"use client";

import React from "react";
import AdminMenu from "./ShortLink";
import { Shortlink } from "@/types/shortlink.types";
import { instance } from "@/utils/app/axiosInstance";
import Button from "../UI/Button";
import { AdminTabs } from "@/types/admin";
import ShortlinksContainer from "./ShortlinksContainer";
import DomainsContainer from "./DomainsContainer";

function AdminContainer({ tab }: { tab: AdminTabs }) {
  if (tab === AdminTabs.DOMAINS) {
    return <DomainsContainer />;
  }

  if (tab === AdminTabs.SHORT_LINKS) {
    return <ShortlinksContainer />;
  }
}

export default AdminContainer;
