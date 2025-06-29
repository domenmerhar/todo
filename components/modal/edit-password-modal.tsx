import React from "react";
import { DialogContent } from "../ui/dialog";
import EditPasswordForm from "../form/edit-password-form";

export default function EditPasswordModal() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <EditPasswordForm />
    </DialogContent>
  );
}
