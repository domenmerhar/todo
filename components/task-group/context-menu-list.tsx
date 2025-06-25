import { Check, Trash } from "lucide-react";
import React from "react";
import { ContextMenuContent, ContextMenuItem } from "../ui/context-menu";

export default function ContextMenuList({ id }: { id: number }) {
  return (
    <ContextMenuContent>
      <ContextMenuItem>
        <Check /> Complete all tasks
      </ContextMenuItem>

      <ContextMenuItem variant="destructive">
        <Trash /> Delete group
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
