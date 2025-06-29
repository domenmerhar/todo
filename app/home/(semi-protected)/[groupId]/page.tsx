import AddTodoButton from "@/components/add-todo-button";
import { SortableTodos } from "@/components/drag-and-drop/sortable-todos";
import SearchBar from "@/components/searchbar";
import { SelectParam } from "@/components/select-param";

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
        <h2 className="text-2xl font-bold mb-4">{groupId}</h2>
        <SortableTodos />
      </div>
    </div>
  );
}
