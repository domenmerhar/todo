import React from "react";
import TaskGroup from "./task-group";
import { LoaderCircle } from "lucide-react";

export default function UserTaskGroupskeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 4 }).map((_, i) => {
        return (
          <TaskGroup
            key={i}
            id={i}
            Icon={LoaderCircle}
            color={""}
            completedTasks={0}
            description={""}
            title={""}
            totalTasks={0}
            className="animate-pulse bg-gray-200 text-transparent"
          />
        );
      })}
    </div>
  );
}
