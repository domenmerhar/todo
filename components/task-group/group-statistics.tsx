import React from "react";
import { StatisticCard } from "../statistic-card";
import { getUserTaskCompletionRate, getUserTaskCount } from "@/lib/db/task";
import {
  getUserCompletedGroups,
  getUserIncompletedGroups,
} from "@/lib/db/group";

export default async function GroupStatistics() {
  const [taskCount, completionRate, completedGroups, incompletedGroups] =
    await Promise.all([
      getUserTaskCount(),
      getUserTaskCompletionRate(),
      getUserCompletedGroups(),
      getUserIncompletedGroups(),
    ]);

  if (
    !taskCount.success ||
    !completionRate.success ||
    !completedGroups.success ||
    !incompletedGroups.success ||
    !taskCount.count ||
    !completionRate.completionRate ||
    !completedGroups.completedGroups ||
    !incompletedGroups.incompletedGroups
  ) {
    return (
      <div className="text-red-500">
        Error loading statistics. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatisticCard
        title="Total Tasks"
        content={taskCount.count}
        contentDescription="Across all groups"
      />

      <StatisticCard
        title="Completed"
        content={Number(completionRate.completionRate).toFixed(2) + "%"}
        contentDescription="Completion rate"
      />

      <StatisticCard
        title="Completed Groups"
        content={completedGroups.completedGroups}
        contentDescription="Groups with all tasks completed"
      />

      <StatisticCard
        title="Incompleted Groups"
        content={incompletedGroups.incompletedGroups}
        contentDescription="Groups with unfinished tasks"
      />
    </div>
  );
}
