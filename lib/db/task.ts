import "server-only";
import { query } from ".";

export interface Task {
  id: number;
  group_id: number;
  task_name: string;
  finsihed: boolean;
}

interface GetGroupTasksResponse {
  success: boolean;
  tasks?: Task[];
  error?: string;
}

export async function getGroupTasks(
  groupId: string
): Promise<GetGroupTasksResponse> {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate delay
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
