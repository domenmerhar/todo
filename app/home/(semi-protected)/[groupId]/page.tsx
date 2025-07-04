import AddTodoButton from "@/components/add-todo-button";
import GroupTitle from "@/components/drag-and-drop/group-title";
import SortableTodosHolder from "@/components/drag-and-drop/sortable-todos-holder";
import SearchBar from "@/components/searchbar";
import { SelectParam } from "@/components/select-param";
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
