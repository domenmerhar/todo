"use server";

import { redirect } from "next/navigation";
import { query } from "../db";
import { getSession } from "./auth";
import { completeGroupTasks, deleteGroup } from "../db/group";
import { revalidatePath } from "next/cache";

export async function addTodoGroup(
  _prevState: {
    success: boolean;
    errors: string[];
    values: {
      name: string;
      icon: string;
      color: string;
      public: string;
    };
  },
  formData: FormData
) {
  const name = formData.get("name")?.toString() as string;
  const icon = formData.get("icon")?.toString() as string;
  const color = formData.get("color")?.toString() as string;
  const publicAccess = formData.get("public") === "on" ? true : false;
  const publicBool = publicAccess ? "on" : "off";

  const errors = [];

  const session = await getSession();

  if (!session?.user) redirect("/sign-in");

  if (!name.trim().length) errors.push("Name is required.");
  if (!icon.trim().length) errors.push("Icon is required.");
  if (!color.trim().length) errors.push("Color is required.");
  if (!color.match(/^#[0-9A-Fa-f]{6}$/))
    errors.push("Color must be a valid hex code.");

  if (errors.length)
    return {
      success: false,
      errors,
      values: { name, icon, color, public: publicBool },
    };

  let res;

  try {
    res = await query(
      `INSERT INTO "Group" (user_id, group_name, public, icon, color)
      VALUES ($1, $2, $3, $4, $5) RETURNING *;`,
      [session.user.id, name, publicBool, icon, color]
    );
  } catch {
    errors.push("An error occurred while adding the task group.");
  }

  redirect(`/home/${res?.rows[0].id}`);
}

export async function deleteGroupAction(id: number) {
  try {
    await deleteGroup(id);
  } catch (error) {
    console.error("Error deleting group:", error);
    return;
  }

  revalidatePath("/home");
}

export async function completeGroupTasksAction(id: number) {
  try {
    await completeGroupTasks(id);
  } catch (error) {
    console.error("Error completing group tasks:", error);
    return;
  }

  revalidatePath("/home");
}
