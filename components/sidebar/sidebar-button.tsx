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
    <div>
      <Tooltip>
        <TooltipTrigger className="flex items-center gap-4 whitespace-nowrap">
          {children}
        </TooltipTrigger>

        <TooltipContent side="left">
          <p>{tooltipContent}</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
