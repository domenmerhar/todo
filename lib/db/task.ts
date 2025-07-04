import "server-only";
import { query } from ".";
import { getSession } from "../actions/auth";
import { DEV_PROMISE_DELAY } from "../constants";

export interface Task {
  id: number;
  group_id: number;
  task_name: string;
  finsihed: boolean;
}

interface GetUserTaskCompletionRateResponse {
  success: boolean;
  count?: number;
  error?: string;
}

export async function getUserTaskCompletionRate(): Promise<GetUserTaskCompletionRateResponse> {
  await new Promise((resolve) => setTimeout(resolve, DEV_PROMISE_DELAY));

  const session = await getSession();
  if (!session?.user?.id)
    return { success: false, error: "User not authenticated" };

  let res;

  try {
    res = await query(
      `
        SELECT 
          100.0 * (
              SELECT COUNT(*)
              FROM "Task"
              WHERE "finished" = true 
              AND "group_id" IN (
                  SELECT "id"
                  FROM "Group"
                  WHERE "user_id" = $1
              )
          ) 
          / NULLIF((
              SELECT COUNT(*)
              FROM "Task"
              WHERE "group_id" IN (
                  SELECT "id"
                  FROM "Group"
                  WHERE "user_id" = $1
              )
          ), 0) AS completion_percentage;
      `,
      [session.user.id]
    );
  } catch (error) {
    console.error("Error fetching task completion percentage:", error);
    return { success: false, error: "Failed to fetch completion percentage" };
  }

  if (!res.rows[0])
    return { success: false, error: "No completion percentage found" };

  return {
    success: true,
    count: res.rows[0],
  };
}

interface GetUserTaskCountResponse {
  success: boolean;
  count?: number;
  error?: string;
}

export async function getUserTaskCount(): Promise<GetUserTaskCountResponse> {
  await new Promise((resolve) => setTimeout(resolve, DEV_PROMISE_DELAY));

  const session = await getSession();
  if (!session?.user?.id)
    return { success: false, error: "User not authenticated" };

  let res;

  try {
    res = await query(
      `
        SELECT COUNT(*)
        FROM "Task"
        WHERE "group_id"
        IN (SELECT "id"
        FROM "Group"
        WHERE "user_id" = $1);
      `,
      [session.user.id]
    );
  } catch (error) {
    console.error("Error fetching task count:", error);
    return { success: false, error: "Failed to fetch task count" };
  }

  if (!res || !res.rowCount) return { success: false, error: "No tasks found" };

  return {
    success: true,
    count: res.rows[0],
  };
}

interface GetGroupTasksResponse {
  success: boolean;
  tasks?: Task[];
  error?: string;
}

export async function getGroupTasks(
  groupId: string
): Promise<GetGroupTasksResponse> {
  await new Promise((resolve) => setTimeout(resolve, DEV_PROMISE_DELAY)); // Simulate delay
  let res;

  try {
    res = await query(
      `SELECT * FROM "Task" WHERE group_id = $1 ORDER BY "order"`,
      [groupId]
    );
  } catch (error) {
    console.error("Error fetching group tasks:", error);
    return { success: false, error: "Failed to fetch group tasks" };
  }

  if (!res || !res.rowCount)
    return { success: false, error: "No tasks found for this group" };

  return {
    success: true,
    tasks: res.rows,
  };
}
