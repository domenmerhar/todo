"use server";

import { headers } from "next/headers";
import { auth } from "../auth";
import pool from "../db/pool";
import { getSession } from "./auth";
import { redirect } from "next/navigation";

export async function editUsername(
  _prevState: { values: { username: string }; errors: string[] },
  formData: FormData
) {
  const username = (formData.get("username") as string) || "";

  let error: string = "";
  if (!username.trim()) error = "Username cannot be empty";

  if (error) return { success: false, error, values: { username } };

  const session = await getSession();
  if (!session || !session.user || !session.user.id) redirect("/sing-in");

  try {
    await pool.query(`UPDATE "user" SET name = $1 WHERE id = $2`, [
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

  return {
    success: true,
    error: "",
    values: { username },
  };
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
