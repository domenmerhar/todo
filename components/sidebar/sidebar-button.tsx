import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export default function SidebarTrigger({
  children,
  tooltipContent,
}: {
  children: React.ReactNode;
  tooltipContent: string;
}) {
  return (
    <div className="flex items-center gap-4 ">
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>

        <TooltipContent side="left">
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
      <p className="font-medium shrink-0">{tooltipContent}</p>
    </div>
  );
}
