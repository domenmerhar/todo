"use client";

import { useSortable } from "@dnd-kit/sortable";
import React, { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Grip } from "lucide-react";

export function Todo({ title, id }: { title: string; id: number }) {
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
        <Label htmlFor={String(id)}>{title}</Label>
      </div>
      <Grip {...attributes} {...listeners} className="cursor-move" />
    </div>
  );
}
