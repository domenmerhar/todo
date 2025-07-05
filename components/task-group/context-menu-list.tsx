import { Check, Eye, Trash } from "lucide-react";
import React from "react";
import { ContextMenuContent, ContextMenuItem } from "../ui/context-menu";
import {
  completeGroupTasksAction,
  deleteGroupAction,
} from "@/lib/actions/task-group";
import Link from "next/link";

export default function ContextMenuList({ id }: { id: number }) {
  return (
    <ContextMenuContent>
      <Link href={`/home/${id}`}>
        <ContextMenuItem className="cursor-pointer">
          <Eye /> View
        </ContextMenuItem>
      </Link>

      <ContextMenuItem
        onClick={completeGroupTasksAction.bind(null, id)}
        className="cursor-pointer"
      >
        <Check /> Complete all tasks
      </ContextMenuItem>

      <ContextMenuItem
        variant="destructive"
        onClick={deleteGroupAction.bind(null, id)}
        className="cursor-pointer"
      >
        <Trash /> Delete group
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
