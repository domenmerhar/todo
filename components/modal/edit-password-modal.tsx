import React from "react";
import {
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import PasswordInput from "../password-input";

export default function EditPasswordModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <form className="space-y-4">
        <DialogHeader>
          <DialogTitle>Edit Password</DialogTitle>
        </DialogHeader>

        <PasswordInput placeholder="Enter your password" required id="password">
          Password
        </PasswordInput>

        <PasswordInput
          placeholder="Confirm your password"
          required
          id="confirm-password"
        >
          Confirm Password
        </PasswordInput>

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
