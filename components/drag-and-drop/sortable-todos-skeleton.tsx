import SortableTodoSkeleton from "./sortable-todo-skeleton";

export default function SortableTodosSkeleton() {
  return Array.from({ length: 5 }).map((_, index) => (
    <SortableTodoSkeleton key={index} />
  ));
}
