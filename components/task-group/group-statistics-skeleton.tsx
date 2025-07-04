import React from "react";
import { StatisticCard } from "../statistic-card";

const cardContent = [
  {
    title: "Total Tasks",
    contentDescription: "Across all groups",
  },
  {
    title: "Completed",
    contentDescription: "Completion rate",
  },
  {
    title: "Completed Groups",
    contentDescription: "Groups with all tasks completed",
  },
  {
    title: "Incompleted Groups",
    contentDescription: "Groups with unfinished tasks",
  },
] as const;

export default async function GroupStatisticsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {cardContent.map((cardData, index) => (
        <StatisticCard
          key={index}
          {...cardData}
          content="..."
          className="animate-pulse bg-gray-200"
        />
      ))}
    </div>
  );
}
