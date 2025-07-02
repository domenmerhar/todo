"use server";

import { auth } from "../auth";
import { query } from "../db";
import { getSession } from "./auth";

export async function addTodoGroup(
  _prevState: {
    success: boolean;
    error: string[];
    values: {
      name: string;
      icon: string;
      color: string;
      public: string;
    };
  },
  formData: FormData
) {
  "use server";

  const name = formData.get("name")?.toString() as string;
  const icon = formData.get("icon")?.toString() as string;
  const color = formData.get("color")?.toString() as string;
  const publicAccess = formData.get("public") === "on" ? true : false;
  const publicBool = publicAccess ? "on" : "off";

  const errors = [];

  const session = await getSession();

  if (!session?.user) {
    errors.push("You must be logged in to add a task group.");
    return { success: false, errors, values: {} };
  }

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

  try {
    query(
      `INSERT INTO "Group" (user_id, group_name, public, icon, color)
      VALUES ($1, $2, $3, $4, $5);`,
      [session.user.id, name, publicBool, icon, color]
    );
  } catch {
    errors.push("An error occurred while adding the task group.");
  }

  return {
    success: true,
    errors,
    values: { name, icon, color, public: publicBool },
  };
}
