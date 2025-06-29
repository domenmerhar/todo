import { ClipboardPlus } from "lucide-react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Dialog, DialogTrigger } from "./ui/dialog";
import AddTodoModal from "./modal/add-todo-modal";

export default function AddTodoButton() {
  return (
    <>
      <Dialog>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button className="aspect-square">
                <ClipboardPlus className="size-4" />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>

          <TooltipContent side="bottom">Add Todo</TooltipContent>
        </Tooltip>

        <AddTodoModal />
      </Dialog>
    </>
  );
}
