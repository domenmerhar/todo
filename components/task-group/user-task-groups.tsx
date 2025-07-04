import React from "react";
import TaskGroup from "./task-group";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Heart,
  Home,
  ShoppingCart,
} from "lucide-react";
import { DEV_PROMISE_DELAY } from "@/lib/constants";

const todoGroups = [
  {
    id: 1,
    title: "Work Projects",
    description: "Professional tasks and deadlines",
    icon: Briefcase,
    color: "bg-blue-500",
    totalTasks: 12,
    completedTasks: 8,
    priority: "high",
  },
  {
    id: 2,
    title: "Personal",
    description: "Daily life and personal goals",
    icon: Home,
    color: "bg-green-500",
    totalTasks: 8,
    completedTasks: 5,
    priority: "medium",
  },
  {
    id: 3,
    title: "Shopping",
    description: "Grocery and shopping lists",
    icon: ShoppingCart,
    color: "bg-orange-500",
    totalTasks: 15,
    completedTasks: 12,
    priority: "low",
  },
  {
    id: 4,
    title: "Health & Fitness",
    description: "Wellness and exercise routines",
    icon: Heart,
    color: "bg-red-500",
    totalTasks: 6,
    completedTasks: 4,
    priority: "medium",
  },
  {
    id: 5,
    title: "Learning",
    description: "Courses and skill development",
    icon: GraduationCap,
    color: "bg-purple-500",
    totalTasks: 10,
    completedTasks: 3,
    priority: "high",
  },
  {
    id: 6,
    title: "Events",
    description: "Upcoming events and planning",
    icon: Calendar,
    color: "bg-indigo-500",
    totalTasks: 4,
    completedTasks: 2,
    priority: "low",
  },
] as const;

export default async function UserTaskGroups() {
  await new Promise((resolve) => setTimeout(resolve, DEV_PROMISE_DELAY));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {todoGroups.map((group) => {
        const {
          color,
          completedTasks,
          description,
          icon,
          id,
          title,
          totalTasks,
        } = group;

        return (
          <TaskGroup
            key={id}
            id={id}
            Icon={icon}
            color={color}
            completedTasks={completedTasks}
            description={description}
            title={title}
            totalTasks={totalTasks}
          />
        );
      })}
    </div>
  );
}
