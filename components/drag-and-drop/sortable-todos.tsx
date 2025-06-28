"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { IdLabelObj } from "@/lib/types/objects";
import { SortableTodo } from "./sortable-todo";

const testData: IdLabelObj[] = [
  {
    id: "1",
    label: "Test Task 1",
  },
  {
    id: "2",
    label: "Test Task 2",
  },
  {
    id: "3",
    label: "Test Task 3",
  },
];

export const SortableTodos = () => {
  const [todos, setTodos] = useState<IdLabelObj[]>(testData);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        // console.log(newIndex);
        // console.log(active);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div className="max-w-2xl mx-auto grid gap-2 my-10">
      <h2 className="text-2xl font-bold mb-4">Todos</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext items={todos} strategy={verticalListSortingStrategy}>
          {todos.map((user) => (
            <SortableTodo key={user.id} id={user.id} label={user.label} />
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
};
