import React, { Fragment } from "react";
import TaskGroup from "./task-group";
import { Briefcase } from "lucide-react";
import { getUserGroups } from "@/lib/db/group";
import { ICONS } from "@/lib/constants/icons";

export default async function UserTaskGroups() {
  const data = await getUserGroups();

  if (!data.success || !data.groups) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.groups.map(
        ({
          group_id,
          group_name,
          icon,
          color,
          public: isPublic,
          completed_tasks,
          total_tasks,
        }) => {
          const iconValue =
            ICONS.find(({ name }) => name === icon)?.value || Briefcase;

          return (
            <Fragment key={group_id}>
              <TaskGroup
                key={group_id}
                id={group_id}
                color={color}
                Icon={iconValue}
                completedTasks={completed_tasks}
                isPublic={isPublic}
                title={group_name}
                totalTasks={total_tasks}
              />
            </Fragment>
          );
        }
      )}
    </div>
  );
}
