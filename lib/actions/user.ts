"use server";

export async function editUsername(
  _prevState: { values: { username: string }; errors: string[] },
  formData: FormData
) {
  const username = (formData.get("username") as string) || "";

  let error: string = "";
  if (!username.trim()) error = "Username cannot be empty";

  if (error) return { error, values: { username } };

  return {
    error: "",
    values: { username },
  };
}

export async function changePassword(
  _prevState: {
    values: { password: string; confirmPassword: string };
    errors: string[];
  },
  formData: FormData
) {
  const password = (formData.get("password") as string) || "";
  const confirmPassword = (formData.get("confirm-password") as string) || "";

  console.log(confirmPassword);

  const errors: string[] = [];

  if (!password.trim()) errors.push("Password cannot be empty");
  else if (password.length < 8)
    errors.push("Password must be at least 8 characters long");

  if (!confirmPassword.trim()) errors.push("Confirm Password cannot be empty");
  else if (confirmPassword.length < 8)
    errors.push("Confirm Password must be at least 8 characters long");

  if (errors.length === 0 && password !== confirmPassword)
    errors.push("Passwords do not match");

  if (errors.length > 0)
    return { errors, values: { password, confirmPassword } };

  return {
    errors: [],
    values: { password, confirmPassword },
  };
}
