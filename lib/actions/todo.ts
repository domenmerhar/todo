"use server";

import { redirect } from "next/navigation";
import { getSession } from "./auth";
import { query } from "../db";
import { DBResponse } from "../types/db";
import {
  deleteTask,
  reorderTodo,
  ReorderTodoParams,
  toggleTask,
} from "../db/task";

export async function addTodo(
  _prevState: {
    success: boolean;
    errors: string[];
    values: {
      name: string;
      groupId: string;
    };
  },
  formData: FormData
) {
  const name = formData.get("name") as string;
  const groupId = formData.get("groupId") as string;

  const errors = [];

  const session = await getSession();
  if (!session?.user.id) redirect("/sign-in");

  try {
    await query(`SELECT * FROM "Group" WHERE id = $1 AND user_id = $2`, [
      groupId,
      session.user.id,
    ]);
  } catch {
    errors.push(
      "You are not allowed to add todos to this group or it doesn't exist."
    );
  }

  if (errors.length)
    return { success: false, errors, values: { name, groupId } };

  if (!name.trim().length) errors.push("Name is required.");
  if (!groupId.trim().length) errors.push("Group ID is required.");
  if (errors.length)
    return { success: false, errors, values: { name, groupId } };

  try {
    await query(
      `
            INSERT INTO "Task" ("group_id", "order", "task_name")
            SELECT $1,
                COALESCE(MAX("order"), 0) + 1,
                $2
            FROM "Task"
            WHERE "group_id" = $1;

        `,
      [groupId, name]
    );
  } catch {
    errors.push("An error occurred while adding the todo.");
  }

  if (errors.length)
    return { success: false, errors, values: { name, groupId } };

  return {
    success: true,
    errors: [],
    values: { name, groupId },
  };
}

export async function reorderTaskAction({
  groupId,
  taskId,
  oldOrder,
  newOrder,
}: ReorderTodoParams): Promise<DBResponse> {
  const session = await getSession();

  if (!session?.user?.id)
    return { success: false, error: "User not authenticated" };

  try {
    await reorderTodo({ groupId, taskId, oldOrder, newOrder });
  } catch (error) {
    console.error("Error reordering task:", error);
    return { success: false, error: "Failed to reorder task" };
  }

  return { success: true };
}

export async function toggleTaskAction(taskId: number): Promise<DBResponse> {
  const session = await getSession();

  const userId = session?.user?.id;
  if (!userId) throw new Error("User not authenticated");

  try {
    await toggleTask(taskId, userId);
  } catch (error) {
    console.error("Error toggling task:", error);
    return { success: false, error: "Failed to toggle task" };
  }

  return { success: true };
}

export async function deleteTaskAction(taskId: number): Promise<DBResponse> {
  const session = await getSession();

  const userId = session?.user?.id;
  if (!userId) throw new Error("User not authenticated");

  try {
    await deleteTask(taskId, userId);
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, error: "Failed to delete task" };
  }

  return { success: true };
}
