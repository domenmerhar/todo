import React from "react";
import { DialogContent } from "../ui/dialog";
import EditUsernameForm from "../form/edit-username-form";

export const EditUsernameModal = () => {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <EditUsernameForm />
    </DialogContent>
  );
};
