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
import {
  deleteTaskAction,
  reorderTaskAction,
  toggleTaskAction,
} from "@/lib/actions/todo";

export const SortableTodos = ({ tasks }: { tasks: Task[] }) => {
  const [todos, setTodos] = useState<Task[]>(tasks);

  const [optimisticTodos, updateOptimisticTodos] = useOptimistic(
    todos,
    (state, payload: { type: "toggle" | "reorder" | "delete"; data: any }) => {
      switch (payload.type) {
        case "toggle":
          return state.map((task) =>
            task.id === payload.data
              ? { ...task, finished: !task.finished }
              : task
          );
        case "reorder":
          return arrayMove(state, payload.data.oldIndex, payload.data.newIndex);
        case "delete":
          return state.filter((task) => task.id !== payload.data);
        default:
          return state;
      }
    }
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

  const handleDelete = async (taskId: number) => {
    startTransition(() =>
      updateOptimisticTodos({ type: "delete", data: taskId })
    );

    setTodos((prev) => prev.filter((task) => task.id !== taskId));

    try {
      await deleteTaskAction(taskId);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

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
            onDelete={handleDelete}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
};
