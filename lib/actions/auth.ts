"use server";

import { redirect } from "next/navigation";
import { auth } from "../auth";
import { headers } from "next/headers";

export async function signIn(
  _prevState: { values: { email: string; password: string } },
  formData: FormData
) {
  const email = (formData.get("email") as string) || "";
  const password = (formData.get("password") as string) || "";

  const errors: string[] = [];

  if (!email.trim()) errors.push("Username or email is required.");
  else if (!email.includes("@")) errors.push("Email must be valid.");

  if (!password.trim()) errors.push("Password is required.");
  else if (password.length < 8)
    errors.push("Password must be at least 8 characters.");

  if (errors.length) return { values: { email, password }, errors };

  try {
    await auth.api.signInEmail({
      body: { email, password },
      headers: await headers(),
    });
  } catch {
    return {
      values: { email, password },
      errors: ["Invalid email or password."],
    };
  }

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

  try {
    await auth.api.signUpEmail({
      body: { name: username, email, password, callbackURL: "/home" },
      headers: await headers(),
    });
  } catch (error) {
    console.error("Failed to sign up", error);
    return {
      values: {
        username,
        email,
        password,
        confirmPassword,
      },
      errors: ["Failed to sign up. Please try again."],
    };
  }

  redirect("/home");
}

export async function signOut() {
  try {
    await auth.api.signOut({
      headers: await headers(),
    });
  } catch (error) {
    console.error("Failed to sign out", error);
  }
  redirect("/");
}

export async function getSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session;
}
