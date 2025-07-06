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
import { reorderTaskAction, toggleTaskAction } from "@/lib/actions/todo";

export const SortableTodos = ({ tasks }: { tasks: Task[] }) => {
  const [todos, setTodos] = useState<Task[]>(tasks);

  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    todos,
    (state, taskId) =>
      state.map((task) =>
        task.id === taskId ? { ...task, finished: !task.finished } : task
      )
  );

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleToggle = async (taskId: number) => {
    startTransition(() => updateOptimisticTodos(taskId));

    setTodos((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, finished: !task.finished } : task
      )
    );

    try {
      await toggleTaskAction(taskId);
    } catch (error) {
      console.error("Failed to toggle task:", error);
      // Optional: rollback state or show toast error
    }
  };

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((item) => item.id === active.id);
      const newIndex = todos.findIndex((item) => item.id === over.id);
      const movedTask = todos[oldIndex];

      startTransition(() =>
        updateOptimisticTodos({ oldIndex, newIndex } as any)
      );
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
          <Todo
            key={id}
            id={id}
            title={task_name}
            checked={finished}
            onCheck={handleToggle}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};
