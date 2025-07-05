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
import { Task } from "@/lib/db/task";
import { Task as TaskComponent } from "./test";

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

export const SortableTodos = ({ tasks }: { tasks: Task[] }) => {
  const [todos, setTodos] = useState<Task[]>(tasks);
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

        // console.log({ newIndex });
        // console.log({ active });

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <SortableContext items={todos} strategy={verticalListSortingStrategy}>
        {todos.map(({ id, task_name }) => (
          <TaskComponent id={id} title={task_name} key={id} />
        ))}
      </SortableContext>
    </DndContext>
  );
};

// <SortableTodo key={id} id={String(id)} label={task_name} />
