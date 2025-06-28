import React from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import SidebarTrigger from "./sidebar-button";
import { Button } from "../ui/button";

export default function SidebarDialog({
  children,
  icon,
  text,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarTrigger tooltipContent={text}>
          <Button className="size-8 p-3" asChild>
            {icon}
          </Button>
          {text}
        </SidebarTrigger>
      </DialogTrigger>
      {children}
    </Dialog>
  );
}
