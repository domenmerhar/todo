"use client";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import React, { CSSProperties, useState } from "react";
import { CSS } from "@dnd-kit/utilities";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableTodo } from "./sortable-todo";
import Todo from "../todo";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Grid, Grip } from "lucide-react";

const initialTasks: { id: number; title: string }[] = [
  {
    id: 1,
    title: "Task 1",
  },
  {
    id: 2,
    title: "Task 2",
  },
  {
    id: 3,
    title: "Task 3",
  },
];

export default function Test() {
  const [tasks, setTasks] = useState(initialTasks);

  const getTaskPos = (id: number) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) return;

    setTasks((prevTasks) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(prevTasks, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        <div className="column">
          {tasks.map((task) => (
            <Task key={task.id} id={task.id} title={task.title} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}

export function Task({ title, id }: { title: string; id: number }) {
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
