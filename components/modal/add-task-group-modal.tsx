"use client";

import React, { useActionState } from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import IconCombobox from "../combobox/icon-combobox";
import { ColorPicker } from "../color-picker";
import { addTodoGroup } from "@/lib/actions/task-group";
import Form from "next/form";
import ErrorList from "../error-list";
import ModalPendingButtons from "./modal-pending-buttons";
import useToastTrue from "@/lib/hooks/use-toast-true";

export default function AddTaskGroupModal() {
  const [state, formAction, isPending] = useActionState(addTodoGroup, {
    success: false,
    errors: [],
    values: {
      name: "",
      icon: "ListTodo",
      color: "blue",
      public: "off",
    },
  });

  useToastTrue(state.success, "Task group added successfully!");

  return (
    <DialogContent className="sm:max-w-[425px]">
      <Form formMethod="POST" action={formAction} className="space-y-4">
        <DialogHeader>
          <DialogTitle>Add Task Group</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="name">Task Group Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Shopping list"
            defaultValue={state.values.name}
            required
          />
        </div>

        <IconCombobox />

        <div className="flex items-center justify-between ml-0.5">
          <Label htmlFor="color">Icon Color</Label>
          <ColorPicker name="color" size={"icon"} />
        </div>

        <div className="flex justify-between ml-0.5 space-y-4">
          <Label htmlFor="public">Public Access</Label>
          <Switch
            name="public"
            id="public"
            className="scale-115 mr-1"
            defaultValue={state.values.public === "on" ? 1 : 0}
          />
        </div>

        <ErrorList errors={state.errors} />

        <DialogFooter>
          <ModalPendingButtons
            isPending={isPending}
            buttonOneText="Cancel"
            buttonTwoText="Save Changes"
          />
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
