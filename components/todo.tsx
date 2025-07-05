import React, { CSSProperties } from "react";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { IdLabelObj } from "@/lib/types/objects";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Grip } from "lucide-react";

export default function Todo({ id, label }: IdLabelObj) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      className="bg-gray-50 p-4 rounded shadow-md flex justify-between items-center"
      ref={setNodeRef}
      style={style}
    >
      <div className="flex items-center gap-4">
        <Checkbox id={String(id)} />
        <Label htmlFor={String(id)}>{label}</Label>
      </div>
      <Grip {...attributes} {...listeners} className="cursor-move" />
    </div>
  );
}
