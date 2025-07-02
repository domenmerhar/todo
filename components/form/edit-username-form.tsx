"use client";

import Form from "next/form";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState, useEffect } from "react";
import { editUsername } from "@/lib/actions/user";
import { Spinner } from "../ui/spinner";
import { toast } from "sonner";

export default function EditUsernameForm() {
  const [state, formAction, isPending] = useActionState(editUsername, {
    success: false,
    error: "",
    values: {
      username: "",
    },
  });

  useEffect(() => {
    if (state.success) toast.success("Username changed successfully!");
  }, [state.success]);

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
