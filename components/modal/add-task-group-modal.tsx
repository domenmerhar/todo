"use client";

import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import IconCombobox from "../combobox/icon-combobox";
import { ColorPicker } from "../color-picker";

export default function AddTaskGroupModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <form className="space-y-4">
        <DialogHeader>
          <DialogTitle>Add Task Group</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="name">Task Group Name</Label>
          <Input id="name" name="name" placeholder="Shopping list" />
        </div>

        <IconCombobox />

        <div className="flex items-center justify-between ml-0.5">
          <Label htmlFor="color">Icon Color</Label>
          <ColorPicker name="color" size={"icon"} />
        </div>

        <div className="flex justify-between ml-0.5 space-y-4">
          <Label htmlFor="public">Public Access</Label>
          <Switch name="public" id="public" className="scale-115 mr-1" />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
