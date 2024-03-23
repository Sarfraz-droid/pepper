import { AdminTabs } from "@/types/admin";
import React from "react";

type IProps = {
  tab: AdminTabs;
  setTabState: (tab: AdminTabs) => void;
};

function TabButton(props: IProps) {
  if (props.tab == AdminTabs.SHORT_LINKS) {
    return (
      <button
        className="btn btn-ghost flex gap-2 self-center"
        onClick={() => props.setTabState(AdminTabs.DOMAINS)}
      >
        Manage Domains
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    );
  }

  if (props.tab == AdminTabs.DOMAINS) {
    return (
      <button
        className="btn btn-ghost flex gap-2 self-center group"
        onClick={() => props.setTabState(AdminTabs.SHORT_LINKS)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
          />
        </svg>
        Manage Short Links
      </button>
    );
  }
}

export default TabButton;
