import {
  Briefcase,
  Home,
  ShoppingCart,
  Heart,
  GraduationCap,
  Calendar,
} from "lucide-react";
import { StatisticCard } from "@/components/statistic-card";
import TaskGroup from "@/components/task-group/task-group";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the home page of Todo App.",
};

const todoGroups = [
  {
    id: 1,
    title: "Work Projects",
    description: "Professional tasks and deadlines",
    icon: Briefcase,
    color: "bg-blue-500",
    totalTasks: 12,
    completedTasks: 8,
    dueToday: 3,
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
    dueToday: 1,
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
    dueToday: 0,
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
    dueToday: 2,
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
    dueToday: 1,
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
    dueToday: 0,
    priority: "low",
  },
];

export default function Page() {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatisticCard
          title="Total Tasks"
          content="55"
          contentDescription="Across all groups"
        />

        <StatisticCard
          title="Completed"
          content="30"
          contentDescription="55% completion rate"
        />

        <StatisticCard
          title="Due Today"
          content="7"
          contentDescription="Tasks requiring attention"
        />

        <StatisticCard
          title="Active Groups"
          content="6"
          contentDescription="Todo categories"
        />
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Your Todo Groups
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {todoGroups.map((group) => {
            const {
              color,
              completedTasks,
              description,
              dueToday,
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
                dueToday={dueToday}
                title={title}
                totalTasks={totalTasks}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
