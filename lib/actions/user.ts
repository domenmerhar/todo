"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import { getSession } from "./auth";
import { redirect } from "next/navigation";
import { query } from "../db";
import { revalidatePath } from "next/cache";
import { DBResponse } from "../types/db";

export async function editUsername(
  _prevState: { values: { username: string }; error: string },
  formData: FormData
) {
  const username = (formData.get("username") as string) || "";

  let error: string = "";
  if (!username.trim()) error = "Username cannot be empty";

  if (error) return { success: false, error, values: { username } };

  const session = await getSession();
  if (!session || !session.user || !session.user.id) redirect("/sing-in");

  try {
    await query(`UPDATE "user" SET name = $1 WHERE id = $2`, [
      username,
      session.user.id,
    ]);
  } catch (error) {
    console.error("Error updating username:", error);

    return {
      success: false,
      error: "Failed to update username. Please try again.",
      values: { username },
    };
  }

  revalidatePath("/home");

  redirect("/sign-in");
}

export async function changePassword(
  _prevState: {
    values: { password: string; newPassword: string };
    errors: string[];
  },
  formData: FormData
) {
  const password = (formData.get("password") as string) || "";
  const newPassword = (formData.get("new-password") as string) || "";

  const errors: string[] = [];

  if (!password.trim()) errors.push("Password cannot be empty");
  else if (password.length < 8)
    errors.push("Password must be at least 8 characters long");

  if (!newPassword.trim()) errors.push("Confirm Password cannot be empty");
  else if (newPassword.length < 8)
    errors.push("Confirm Password must be at least 8 characters long");

  if (errors.length > 0)
    return { success: false, errors, values: { password, newPassword } };

  try {
    await auth.api.changePassword({
      body: { newPassword, currentPassword: password },
      headers: await headers(),
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return {
      success: false,
      errors: ["Failed to change password. Please try again."],
      values: { password, newPassword },
    };
  }

  return {
    success: true,
    errors: [],
    values: { password, newPassword },
  };
}

interface GetNameResponse extends DBResponse {
  name?: string;
}

export async function getName(): Promise<GetNameResponse> {
  const session = await getSession();
  if (!session?.user.id) return { success: false, error: "User not found" };

  let res;

  try {
    res = await query(`SELECT name FROM "user" WHERE id = $1`, [
      session.user.id,
    ]);

    if (res.rows.length === 0)
      return { success: false, error: "User not found" };
  } catch (error) {
    console.error("Error fetching user name:", error);
    return { success: false, error: "Failed to fetch user name" };
  }

  return {
    success: true,
    name: res.rows[0].name,
  };
}
