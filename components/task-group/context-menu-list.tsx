import { Check, Eye, KeyRound, Lock, Trash } from "lucide-react";
import React from "react";
import { ContextMenuContent, ContextMenuItem } from "../ui/context-menu";
import {
  completeGroupTasksAction,
  deleteGroupAction,
  toggleGroupPublicAccessAction,
} from "@/lib/actions/task-group";
import Link from "next/link";

export default function ContextMenuList({
  id,
  isPublic,
}: {
  id: number;
  isPublic: boolean;
}) {
  return (
    <ContextMenuContent className="*:cursor-pointer">
      <Link href={`/home/${id}`}>
        <ContextMenuItem>
          <Eye /> View
        </ContextMenuItem>
      </Link>

      <ContextMenuItem onClick={completeGroupTasksAction.bind(null, id)}>
        <Check /> Complete all tasks
      </ContextMenuItem>

      <ContextMenuItem onClick={toggleGroupPublicAccessAction.bind(null, id)}>
        {isPublic ? (
          <>
            <Lock /> Change to private
          </>
        ) : (
          <>
            <KeyRound /> Change to public
          </>
        )}
      </ContextMenuItem>

      <ContextMenuItem
        variant="destructive"
        onClick={deleteGroupAction.bind(null, id)}
      >
        <Trash /> Delete group
      </ContextMenuItem>
    </ContextMenuContent>
  );
}
