"use client";

import { startTransition, useOptimistic, useState } from "react";
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
import { Task } from "@/lib/db/task";
import { Todo } from "./todo";
import { reorderTaskAction } from "@/lib/actions/todo";

export const SortableTodos = ({ tasks }: { tasks: Task[] }) => {
  const [todos, setTodos] = useState<Task[]>(tasks);

  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    tasks,
    (state, { oldIndex, newIndex }) => arrayMove(state, oldIndex, newIndex)
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((item) => item.id === active.id);
      const newIndex = todos.findIndex((item) => item.id === over.id);

      const movedTask = todos[oldIndex];

      startTransition(() => updateOptimisticTodos({ oldIndex, newIndex }));

      setTodos((prev) => arrayMove(prev, oldIndex, newIndex));

      await reorderTaskAction({
        groupId: movedTask.group_id,
        taskId: movedTask.id,
        oldOrder: oldIndex + 1,
        newOrder: newIndex + 1,
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
      <SortableContext
        items={optimisticTodos}
        strategy={verticalListSortingStrategy}
      >
        {optimisticTodos.map(({ id, task_name, finished }) => (
          <Todo id={id} title={task_name} key={id} checked={finished} />
        ))}
      </SortableContext>
    </DndContext>
  );
};
