"use client";

import React, { useContext, useEffect } from "react";
import LinkCard from "../Menu/Link";
import { useElementPosition } from "@/hooks/useElementPosition";
import { motion } from "framer-motion";
import { AdminContext } from "../ShortlinksContainer";

function AdminMenu() {
  const [position, ref] = useElementPosition();

  const { data } = useContext(AdminContext);

  return (
    <motion.div
      className="md:max-h-80 overflow-y-auto transition-all"
      ref={ref as any}
      initial={{
        maxHeight: 0,
      }}
      animate={{
        maxHeight: `calc(100vh - ${position.top + 20}px)`,
      }}
      style={{
        opacity: position.top ? 1 : 0,
      }}
    >
      <div className="flex flex-col w-full gap-2 pt-2">
        {data && data.map((item, i) => <LinkCard key={i} item={item} />)}
      </div>
    </motion.div>
  );
}

export default AdminMenu;
