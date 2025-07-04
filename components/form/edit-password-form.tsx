"use client";

import React from "react";
import { DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import PasswordInput from "../password-input";
import Form from "next/form";
import { useActionState } from "react";
import { changePassword } from "@/lib/actions/user";
import ErrorList from "../error-list";
import ModalPendingButtons from "../modal/modal-pending-buttons";
import useToastTrue from "@/lib/hooks/use-toast-true";

export default function EditPasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, {
    success: false,
    errors: [],
    values: {
      password: "",
      newPassword: "",
    },
  });

  useToastTrue(state.success, "Password changed successfully!");

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
        <ModalPendingButtons
          isPending={isPending}
          buttonOneText="Cancel"
          buttonTwoText="Save Changes"
        />
      </DialogFooter>
    </Form>
  );
}
