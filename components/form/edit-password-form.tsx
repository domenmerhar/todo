"use client";

import React from "react";
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

export default function EditPasswordForm() {
  const [state, formAction, isPending] = useActionState(changePassword, {
    errors: [],
    values: {
      password: "",
      confirmPassword: "",
    },
  });

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
        placeholder="Confirm your password"
        required
        id="confirm-password"
        name="confirm-password"
        defaultValue={state.values.confirmPassword}
      >
        Confirm Password
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
