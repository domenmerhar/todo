import { Metadata } from "next";
import GroupStatistics from "@/components/task-group/group-statistics";
import { Suspense } from "react";
import GroupStatisticsSkeleton from "@/components/task-group/group-statistics-skeleton";
import UserTaskGroups from "@/components/task-group/user-task-groups";
import UserTaskGroupskeleton from "@/components/task-group/user-task-groups-skeleton";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to the home page of Todo App.",
};

export default async function HomePage() {
  return (
    <>
      <Suspense fallback={<GroupStatisticsSkeleton />}>
        <GroupStatistics />
      </Suspense>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Your Todo Groups
        </h2>

        <Suspense fallback={<UserTaskGroupskeleton />}>
          <UserTaskGroups />
        </Suspense>
      </div>
    </>
  );
}
