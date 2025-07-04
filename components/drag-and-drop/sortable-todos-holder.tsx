import React from "react";
import { SortableTodos } from "./sortable-todos";
import { getGroupTasks } from "@/lib/db/task";

export default async function SortableTodosHolder({
  groupId,
}: {
  groupId: string;
}) {
  const res = await getGroupTasks(groupId);

  if (!res.success || !res.tasks)
    return (
      <div className="text-red-500">Failed to load tasks: {res.error}</div>
    );

  return <SortableTodos tasks={res.tasks} />;
}
