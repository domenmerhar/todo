import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export const EditUsernameModal = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <form className="space-y-2">
        <DialogHeader>
          <DialogTitle>Edit Username</DialogTitle>
        </DialogHeader>

        <Label htmlFor="name" className="block">
          Username
        </Label>
        <Input id="username" name="username" placeholder="johnny007" />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">Save Changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
};
