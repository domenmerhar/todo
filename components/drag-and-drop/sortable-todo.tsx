"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
import Todo from "../todo";
import { IdLabelObj } from "@/lib/types/objects";

export function SortableTodo({ id, label }: IdLabelObj) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-50 p-4 rounded shadow-md flex justify-between items-center"
    >
      <Todo id={String(id)} label={label} />
      <Grip {...attributes} {...listeners} className="cursor-move" />
    </div>
  );
}
