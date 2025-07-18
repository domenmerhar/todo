import "server-only";

import { query } from ".";
import { getSession } from "../actions/auth";
import { DBResponse } from "../types/db";

export interface Group {
  id: number;
  user_id: string;
  group_name: string;
  public: boolean;
  created_at: Date;
  icon: string;
  color: string;
}

interface GetUserIncompletedGroupsResponse extends DBResponse {
  incompletedGroups?: number;
}

export async function getUserIncompletedGroups(): Promise<GetUserIncompletedGroupsResponse> {
  const session = await getSession();
  if (!session?.user?.id)
    return { success: false, error: "User not authenticated" };

  let res;
  try {
    res = await query(
      `
      SELECT COUNT(*) AS incompleted_groups
      FROM "Group" g
      WHERE g.user_id = $1
        AND EXISTS (
          SELECT 1
          FROM "Task" t
          WHERE t.group_id = g.id
            AND t.finished = false
      );
      `,
      [session.user.id]
    );
  } catch (error) {
    console.error("Error fetching uncompleted groups:", error);

    return {
      success: false,
      error: "Failed to fetch uncompleted groups",
    };
  }

  return {
    success: true,
    incompletedGroups: res.rows[0].incompleted_groups,
  };
}

interface GetUserCompletedGroupsResponse extends DBResponse {
  completedGroups?: number;
}

export async function getUserCompletedGroups(): Promise<GetUserCompletedGroupsResponse> {
  const session = await getSession();
  if (!session?.user?.id)
    return { success: false, error: "User not authenticated" };

  let res;
  try {
    res = await query(
      `
      SELECT COUNT(*) AS completed_groups
      FROM "Group" g
      WHERE g.user_id = $1
        AND NOT EXISTS (
          SELECT 1
          FROM "Task" t
          WHERE t.group_id = g.id
            AND t.finished = false
      );
      `,
      [session.user.id]
    );
  } catch (error) {
    console.error("Error fetching completed groups:", error);

    return {
      success: false,
      error: "Failed to fetch completed groups",
    };
  }

  return {
    success: true,
    completedGroups: res.rows[0].completed_groups,
  };
}

interface GetUserGroupsResponse extends DBResponse {
  groups?: {
    group_id: number;
    group_name: string;
    icon: string;
    color: string;
    public: boolean;
    completed_tasks: number;
    total_tasks: number;
    completion_percentage: number;
  }[];
}

export async function getUserGroups(): Promise<GetUserGroupsResponse> {
  const session = await getSession();
  if (!session?.user?.id)
    return { success: false, error: "User not authenticated" };

  let res;
  try {
    res = await query(
      `
      SELECT 
          g.id AS group_id,
          g.group_name,
          g.icon,
          g.color,
          g.public,
          COUNT(CASE WHEN t.finished THEN 1 END) AS completed_tasks,
          COUNT(t.id) AS total_tasks
      FROM "Group" g
      LEFT JOIN "Task" t ON g.id = t.group_id
      WHERE g.user_id = $1
      GROUP BY g.user_id, g.id, g.group_name, g.icon, g.color
      ORDER BY g.group_name;
      `,
      [session.user.id]
    );
  } catch (error) {
    console.error("Error fetching user groups:", error);

    return {
      success: false,
      error: "Failed to fetch user groups",
    };
  }

  return {
    success: true,
    groups: res.rows,
  };
}

interface GetGroupByIdResponse extends DBResponse {
  group?: Group;
}

export async function getGroupById(
  groupId: string
): Promise<GetGroupByIdResponse> {
  let res;
  try {
    res = await query(`SELECT * FROM "Group" WHERE "id" = $1`, [groupId]);
  } catch (error) {
    console.error("Error fetching group:", error);

    return {
      success: false,
      error: "Failed to fetch group",
    };
  }

  return {
    success: true,
    group: res.rows[0],
  };
}

export async function completeGroupTasks(groupId: number): Promise<DBResponse> {
  try {
    await query(
      `
        UPDATE "Task"
        SET finished = true
        WHERE "group_id" = $1;
      `,
      [groupId]
    );
  } catch (error) {
    console.error("Error fetching group:", error);

    return {
      success: false,
      error: "Failed to fetch group",
    };
  }

  return {
    success: true,
  };
}

export async function deleteGroup(groupId: number) {
  try {
    await query(
      `
        DELETE FROM "Group"
        WHERE id = $1;
      `,
      [groupId]
    );
  } catch (error) {
    throw error;
  }
}

export function toggleGroupPublicAccess(groupId: number, userId: string) {
  return query(
    `
    UPDATE "Group"
    SET public = NOT public
    WHERE id = $1
    AND id IN (
        SELECT "id"
        FROM "Group"
        WHERE "user_id" = $2
    )
    `,
    [groupId, userId]
  );
}
