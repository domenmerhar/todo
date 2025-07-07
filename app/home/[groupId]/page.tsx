import AddTodoButton from "@/components/add-todo-button";
import GroupTitle from "@/components/drag-and-drop/group-title";
import GroupTitleSkeleton from "@/components/drag-and-drop/group-title-skeleton";
import SortableTodosHolder from "@/components/drag-and-drop/sortable-todos-holder";
import SortableTodosSkeleton from "@/components/drag-and-drop/sortable-todos-skeleton";
import SearchBar from "@/components/searchbar";
import { SelectParam } from "@/components/select-param";
import { getSession } from "@/lib/actions/auth";
import { getGroupById } from "@/lib/db/group";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Group",
  description: "Manage your group tasks efficiently",
};

const selectOptions = [
  { name: "All", value: "all" },
  { name: "Unfinished", value: "unfinished" },
  { name: "Finished", value: "finished" },
];

export default async function GroupPage({
  params,
  searchParams,
}: {
  params: Promise<{
    groupId: string;
  }>;
  searchParams: Promise<{
    query?: string;
    status?: "all" | "finished" | "unfinished";
  }>;
}) {
  const [{ groupId }, { query, status }, session] = await Promise.all([
    params,
    searchParams,
    getSession(),
  ]);

  const data = await getGroupById(groupId);

  if (data.group?.public === false && data.group?.user_id !== session?.user?.id)
    redirect("/home");

  return (
    <div>
      <form className="flex items-center gap-4 w-[50vw] *:first:flex-auto">
        <SearchBar name="query" placeholder="Search task" />
        <SelectParam name="status" options={selectOptions} />

        <AddTodoButton />
      </form>

      <div className="max-w-2xl mx-auto grid gap-2 my-10">
        <Suspense fallback={<GroupTitleSkeleton />} key={groupId}>
          <GroupTitle groupId={groupId} />
        </Suspense>

        <Suspense fallback={<SortableTodosSkeleton />} key={`${groupId} todos`}>
          <SortableTodosHolder
            groupId={groupId}
            queryStr={query}
            status={status}
          />
        </Suspense>
      </div>
    </div>
  );
}
