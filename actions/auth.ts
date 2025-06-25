"use server";

export async function signIn(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!username.trim() || !password.trim()) {
  }
}

export async function signUp(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirm-password") as string;

  if (!username.trim() || !password.trim() || !confirmPassword.trim()) {
    return { error: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }
}
