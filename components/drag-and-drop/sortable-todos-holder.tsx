import React from "react";
import { SortableTodos } from "./sortable-todos";
import { getGroupTasks, GetGroupTasksParams } from "@/lib/db/task";

export default async function SortableTodosHolder({
  groupId,
  queryStr,
  status,
}: GetGroupTasksParams) {
  const res = await getGroupTasks({ groupId, queryStr, status });

  if (!res.success || !res.tasks)
    return (
      <div className="text-red-500">Failed to load tasks: {res.error}</div>
    );

  return <SortableTodos tasks={res.tasks} />;
}
