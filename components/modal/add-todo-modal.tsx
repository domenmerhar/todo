"use client";

import React, { useActionState, useEffect } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { addTodo } from "@/lib/actions/todo";
import Form from "next/form";
import { useParams, useRouter } from "next/navigation";
import ErrorList from "../error-list";
import ModalPendingButtons from "./modal-pending-buttons";
import useToastTrue from "@/lib/hooks/use-toast-true";

export default function AddTodoModal() {
  const [state, formAction, isPending] = useActionState(addTodo, {
    success: false,
    errors: [],
    values: {
      name: "",
      groupId: "",
    },
  });
  const router = useRouter();

  useToastTrue(state.success, "Todo added successfully!");

  useEffect(() => {
    console.log(state.success);
    if (state.success) {
      router.refresh();
      router.push(`/home/${state.values.groupId}`);
    }
  }, [state, router]);

  const { groupId } = useParams();

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form action={formAction} formMethod="POST" className="space-y-4">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>

        <input
          type="hidden"
          readOnly
          name="groupId"
          value={groupId}
          className="hidden"
        />

        <div className="space-y-2">
          <Label
            htmlFor="name"
            className="block"
            defaultValue={state.values.name}
          >
            Name
          </Label>
          <Input
            id="username"
            name="name"
            placeholder="Clean dishes"
            required
          />
        </div>

        <ErrorList errors={state.errors} />

        <DialogFooter>
          <ModalPendingButtons
            isPending={isPending}
            buttonOneText="Cancel"
            buttonTwoText="Create"
          />
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
