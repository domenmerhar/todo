"use client";

import React, { useEffect } from "react";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import PasswordInput from "../password-input";
import { Button } from "../ui/button";
import Form from "next/form";
import { useActionState } from "react";
import { changePassword } from "@/lib/actions/user";
import ErrorList from "../error-list";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

export default function EditPasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, {
    success: false,
    errors: [],
    values: {
      password: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    if (state.success) toast.success("Password changed successfully!");
  }, [state.success]);

  return (
    <Form action={formAction} formMethod="POST" className="space-y-4">
      <DialogHeader>
        <DialogTitle>Edit Password</DialogTitle>
      </DialogHeader>

      <PasswordInput
        placeholder="Enter your password"
        required
        name="password"
        id="password"
        defaultValue={state.values.password}
      >
        Password
      </PasswordInput>

      <PasswordInput
        placeholder="Enter your new password"
        required
        id="new-password"
        name="new-password"
        defaultValue={state.values.newPassword}
      >
        New Password
      </PasswordInput>

      {state.errors?.length ? <ErrorList errors={state.errors} /> : null}

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline" disabled={isPending}>
            {isPending ? <Spinner className="text-gray-100" /> : "Cancel"}
          </Button>
        </DialogClose>

        <Button type="submit" disabled={isPending}>
          {isPending ? <Spinner className="text-gray-100" /> : "Save Changes"}
        </Button>
      </DialogFooter>
    </Form>
  );
}
