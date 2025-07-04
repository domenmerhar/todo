import "server-only";
import { query } from ".";

export interface Group {
  id: number;
  user_id: string;
  group_name: string;
  public: boolean;
  created_at: Date;
  icon: string;
  color: string;
}

interface GetGroupByIdResponse {
  success: boolean;
  group?: Group;
  error?: string;
}

export async function getGroupById(
  groupId: string
): Promise<GetGroupByIdResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
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

  if (res.rowCount === 0)
    return {
      success: false,
      error: "Group not found",
    };

  return {
    success: true,
    group: res.rows[0],
  };
}
