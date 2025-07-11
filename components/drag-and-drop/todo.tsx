"use client";

import { useSortable } from "@dnd-kit/sortable";
import React, { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Grip, Trash } from "lucide-react";
import { Button } from "../ui/button";

export function Todo({
  title,
  id,
  checked,
  onCheck,
  onDelete,
}: {
  title: string;
  id: number;
  checked: boolean;
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}) {
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
        <Checkbox
          id={String(id)}
          checked={checked}
          onCheckedChange={() => onCheck?.(id)}
        />
        <Label htmlFor={String(id)}>{title}</Label>
      </div>

      <div className="flex gap-4">
        <Button
          variant="destructive"
          className="size-6"
          onClick={onDelete.bind(null, id)}
        >
          <Trash />
        </Button>{" "}
        <Grip {...attributes} {...listeners} className="cursor-move" />
      </div>
    </div>
  );
}
