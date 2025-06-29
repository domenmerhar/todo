"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import pool from "../db/pool";

export async function signIn(_prevState: {}, formData: FormData) {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  const errors: string[] = [];

  console.log({ email, password });

  if (!email.trim()) errors.push("Username or email is required.");
  else if (!email.includes("@")) errors.push("Email must be valid.");

  if (!password.trim()) errors.push("Password is required.");
  else if (password.length < 8)
    errors.push("Password must be at least 8 characters.");

  if (errors.length) return { values: { email, password }, errors };

  redirect("/home");
}

export async function signUp(
  _prevState: { errors?: string[]; success?: boolean },
  formData: FormData
) {
  const username = (formData.get("username") as string) || "";
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";
  const confirmPassword = (formData.get("confirm-password") as string) || "";

  const errors: string[] = [];

  if (!username.trim()) errors.push("Username is required.");
  if (!email.trim()) errors.push("Email is required.");
  if (!password.trim()) errors.push("Password is required.");
  else if (password.length < 8)
    errors.push("Password must be at least 8 characters.");
  if (!confirmPassword.trim()) errors.push("Confirm password is required.");
  if (password !== confirmPassword) errors.push("Passwords do not match.");

  if (errors.length)
    return {
      values: {
        username,
        email,
        password,
        confirmPassword,
      },
      errors,
    };

  const dbRes = await pool.query("SELECT * FROM 'User';");
  console.log(dbRes.rows);

  const res = await auth.api.signUpEmail({
    body: { name: username, email, password, callbackURL: "/home" },
    method: "POST",
  });

  console.log(res);

  redirect("/home");
}

export async function signOut() {
  console.log("Signing out...");

  redirect("/");
}
