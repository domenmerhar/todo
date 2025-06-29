import React from "react";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

export default function AddTodoModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <form className="space-y-4">
        <DialogHeader>
          <DialogTitle>Add Todo</DialogTitle>
        </DialogHeader>

        <div className="space-y-2">
          <Label htmlFor="name" className="block">
            Name
          </Label>
          <Input
            id="username"
            name="name"
            placeholder="Clean dishes"
            required
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
