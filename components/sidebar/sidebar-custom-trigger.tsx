"use client";

import React, { ComponentProps } from "react";
import { useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import { SidebarClose, SidebarOpen } from "lucide-react";

export const SidebarCustomTrigger = ({
  ...props
}: ComponentProps<typeof Button>) => {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Button onClick={toggleSidebar} {...props}>
      <span className="sr-only">{open ? "Close Sidebar" : "Open Sidebar"}</span>
      {open ? (
        <SidebarOpen className="size-6" />
      ) : (
        <SidebarClose className="size-6" />
      )}
    </Button>
  );
};
