"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";
import { FC } from "react";
import Todo from "../todo";

interface UserItemProps {
  user: {
    id: number;
    name: string;
    email: string;
  };
}
export const SortableItem: FC<UserItemProps> = (props) => {
  const { id, name, email } = props.user;
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
      <Todo id={String(id)} label={`${name}${email}`} />
      <Grip {...attributes} {...listeners} className="cursor-move">
        Drag
      </Grip>
    </div>
  );
};
