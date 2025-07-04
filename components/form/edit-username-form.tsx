"use client";

import Form from "next/form";
import { DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState } from "react";
import { editUsername } from "@/lib/actions/user";
import ModalPendingButtons from "../modal/modal-pending-buttons";
import useToastTrue from "@/lib/hooks/use-toast-true";

export default function EditUsernameForm() {
  const [state, formAction, isPending] = useActionState(editUsername, {
    success: false,
    error: "",
    values: {
      username: "",
    },
  });

  useToastTrue(state.success, "Username changed successfully!");

  return (
    <Form action={formAction} className="space-y-4" formMethod="POST">
      <DialogHeader>
        <DialogTitle>Edit Username</DialogTitle>
      </DialogHeader>

      <div className="space-y-2">
        <Label htmlFor="username" className="block">
          Username
        </Label>
        <Input
          id="username"
          name="username"
          placeholder="johnny007"
          defaultValue={state.values?.username}
        />
      </div>

      {state.error ? (
        <p className="text-red-500 text-sm mt-1">{state.error}</p>
      ) : null}

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
