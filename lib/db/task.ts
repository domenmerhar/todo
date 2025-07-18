import { getClient, query } from ".";
import { getSession } from "../actions/auth";
import { DBResponse } from "../types/db";

export interface Task {
  id: number;
  group_id: number;
  task_name: string;
  finished: boolean;
}

interface GetUserTaskCompletionRateResponse extends DBResponse {
  completionRate?: string;
}

export async function getUserTaskCompletionRate(): Promise<GetUserTaskCompletionRateResponse> {
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

  return {
    success: true,
    completionRate: res.rows[0].completion_percentage,
  };
}

interface GetUserTaskCountResponse extends DBResponse {
  count?: number;
}

export async function getUserTaskCount(): Promise<GetUserTaskCountResponse> {
  const session = await getSession();
  if (!session?.user?.id)
    return { success: false, error: "User not authenticated" };

  let res;

  try {
    res = await query(
      `
        SELECT COUNT(*) AS count
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

  return {
    success: true,
    count: res.rows[0].count,
  };
}

export interface GetGroupTasksParams {
  groupId: string;
  queryStr?: string;
  status?: "all" | "finished" | "unfinished";
}
interface GetGroupTasksResponse extends DBResponse {
  tasks?: Task[];
}

export async function getGroupTasks({
  groupId,
  queryStr,
  status,
}: GetGroupTasksParams): Promise<GetGroupTasksResponse> {
  let res;

  try {
    if (queryStr)
      res = await query(
        `
        SELECT * 
        FROM "Task"
        WHERE group_id = $1
        AND LOWER(task_name) LIKE $2
        ${status === "finished" ? "AND finished = true" : ""}
        ${status === "unfinished" ? "AND finished = false" : ""}
        ORDER BY "order"
        `,
        [groupId, `%${queryStr.toLowerCase()}%`]
      );
    else
      res = await query(
        `
      SELECT * 
      FROM "Task"
      WHERE group_id = $1
      ${status === "finished" ? "AND finished = true" : ""}
      ${status === "unfinished" ? "AND finished = false" : ""}
      ORDER BY "order"
      `,
        [groupId]
      );
  } catch (error) {
    console.error("Error fetching group tasks:", error);
    return { success: false, error: "Failed to fetch group tasks" };
  }

  return {
    success: true,
    tasks: res.rows,
  };
}

export interface ReorderTodoParams {
  groupId: number;
  taskId: number;
  oldOrder: number;
  newOrder: number;
}

export async function reorderTodo({
  groupId,
  oldOrder,
  newOrder,
  taskId,
}: ReorderTodoParams) {
  const client = await getClient();

  try {
    await client.query(`BEGIN`);

    await client.query(
      `
      UPDATE public."Task"
      SET "order" = "order" - 1
      WHERE group_id = $1
        AND "order" > $2
        AND "order" <= $3
      `,
      [groupId, oldOrder, newOrder]
    );

    await client.query(
      `
      UPDATE public."Task"
      SET "order" = "order" + 1
      WHERE group_id = $1
        AND "order" < $2
        AND "order" >= $3;
      `,
      [groupId, oldOrder, newOrder]
    );

    await client.query(
      `
      UPDATE public."Task"
      SET "order" = $2
      WHERE group_id = $1
        AND id = $3;
        `,
      [groupId, newOrder, taskId]
    );

    await client.query(`COMMIT`);
  } catch (error) {
    await client.query(`ROLLBACK`);
    throw error;
  } finally {
    client.release();
  }
}

export async function toggleTask(taskId: number, userId: string) {
  return await query(
    `
      UPDATE "Task"
      SET finished = NOT finished
      WHERE id = $1
      AND "group_id" IN (
        SELECT id 
        FROM "Group"
        WHERE "user_id" = $2
      )
      `,
    [taskId, userId]
  );
}

export async function deleteTask(taskId: number, userId: string) {
  const client = await getClient();

  try {
    client.query(`BEGIN`);

    const res = await client.query(
      `
      DELETE FROM "Task"
      WHERE id = $1
      AND "group_id" IN (
        SELECT id 
        FROM "Group"
        WHERE "user_id" = $2
      )
      RETURNING *
      `,
      [taskId, userId]
    );

    const order = res.rows[0].order;

    await client.query(
      `
      UPDATE "Task"
      SET "order" = "order" - 1
      WHERE "group_id" IN (
        SELECT id 
        FROM "Group"
        WHERE "user_id" = $2
      )
      AND "order" > $1;
      `,
      [order, userId]
    );

    client.query(`COMMIT`);
  } catch (error) {
    client.query(`ROLLBACK`);
    throw error;
  } finally {
    client.release();
  }
}
