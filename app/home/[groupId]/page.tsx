import AddTodoButton from "@/components/add-todo-button";
import GroupTitle from "@/components/drag-and-drop/group-title";
import SortableTodosHolder from "@/components/drag-and-drop/sortable-todos-holder";
import SearchBar from "@/components/searchbar";
import { SelectParam } from "@/components/select-param";
import { getSession } from "@/lib/actions/auth";
import { getGroupById } from "@/lib/db/group";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {};

const selectOptions = [
  { name: "All", value: "all" },
  { name: "Done", value: "done" },
  { name: "To Do", value: "todo" },
];

export default async function Page({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const [data, session] = await Promise.all([
    getGroupById(groupId),
    getSession(),
  ]);

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
        <Suspense fallback={<div>Loading group...</div>} key={groupId}>
          <GroupTitle groupId={groupId} />
        </Suspense>

        <Suspense
          fallback={<div>Loading todos...</div>}
          key={`${groupId} todos`}
        >
          <SortableTodosHolder groupId={groupId} />
        </Suspense>
      </div>
    </div>
  );
}
